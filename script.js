(function(window) {

  // Assumes arr is 2x2.
  var flatten = function(arr) {
    var res = [];
    for (var y = 0; y < arr[0].length; y++) {
      for (var x = 0; x < arr.length; x++) {
        res.push(arr[x][y]);
      }
    }
    return res;
  };

  // Assumes arr is 2x2.
  var round = function(arr) {
    var res = [];
    for (var x = 0; x < arr.length; x++) {
      res[x] = [];
      for (var y = 0; y < arr[x].length; y++) {
        res[x][y] = Math.round(arr[x][y]);
      }
    }
    return res;
  };

  // Assumes arr1 and arr2 are 2x2 (of the same size).
  var diff = function(arr1, arr2) {
    var res = [];
    for (var x = 0; x < arr1.length; x++) {
      res[x] = [];
      for (var y = 0; y < arr1[x].length; y++) {
        res[x][y] = Math.abs(arr1[x][y] - arr2[x][y]);
      }
    }
    return res;
  };

  var reshapeTo2D = function(arr, width, height) {
    var res = [];
    for (var i = 0; i < width; i++) {
      res[i] = [];
    }
    for (var i = 0; i < arr.length; i++) {
      res[i % width][Math.floor(i / height)] = arr[i];
    }
    return res;
  };

  var gol = function(arr) {
    var res = [];
    for (var x = 0; x < arr.length; x++) {
      res[x] = [];
      for (var y = 0; y < arr[x].length; y++) {
        var numAliveNeighs = 0;
        for (var sx = Math.max(x-1, 0); sx <= Math.min(x+1, arr.length-1); sx++) {
          for (var sy = Math.max(y-1, 0); sy <= Math.min(y+1, arr[x].length-1); sy++) {
            if (arr[sx][sy] == 1 && !(sx == x && sy == y)) numAliveNeighs++;
          }
        }
        if      (arr[x][y] == 1 && numAliveNeighs < 2)  res[x][y] = 0;
        else if (arr[x][y] == 1 && numAliveNeighs < 4)  res[x][y] = 1;
        else if (arr[x][y] == 1 && numAliveNeighs >= 4) res[x][y] = 0;
        else if (arr[x][y] == 0 && numAliveNeighs == 3) res[x][y] = 1;
        else res[x][y] = 0;
      }
    }
    return res;
  };

  var downloadJSON = function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.onload = function() {
      callback(JSON.parse(this.response));
    };
  };

  var getNetFromJSON = function(url, callback) {
    downloadJSON(url, function(res) {
      var net = new convnetjs.Net();
      net.fromJSON(res);
      callback(net);
    });
  };

  var getGOLGlider = function() {
    return [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,1,0,0,0,0],
      [0,0,0,0,0,1,0,0,0],
      [0,0,0,1,1,1,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];
  };

  var getGOLFlipper = function() {
    return [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,1,0,0,0,0],
      [0,0,0,0,1,0,0,0,0],
      [0,0,0,0,1,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];
  };

  var getGOLZip = function() {
    return [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,1,0,0,0,0],
      [0,0,0,1,1,0,0,0,0],
      [0,0,0,1,1,0,0,0,0],
      [0,0,0,1,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];
  };

  var getEndDemoInitState = function() {
    return [
      [0,0,0,0,1,0,1,0,0],
      [0,1,0,0,1,0,0,1,0],
      [0,1,1,0,1,1,0,1,0],
      [1,0,0,1,1,0,0,0,0],
      [0,1,1,1,0,1,0,1,0],
      [0,0,1,0,1,0,0,0,0],
      [0,0,1,1,0,0,1,0,0],
      [0,1,1,0,1,1,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];
  };

  var getGOLRule1 = function() {
    return [
      [1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];
  };

  var getGOLRule2 = function() {
    return [
      [1,1,1,0,0,0,1,1,1],
      [1,1,1,0,0,0,1,1,1],
      [1,1,1,0,0,0,1,1,1],
      [0,0,0,0,0,0,1,1,1],
      [0,0,0,0,0,0,1,1,1],
      [0,0,0,0,0,0,1,1,1],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ];
  };

  var getGOLRule3 = function() {
    return [
      [1,1,1,0,0,0,1,1,1],
      [1,1,1,0,0,0,1,1,1],
      [1,1,1,0,0,0,1,1,1],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,1,1,1],
      [0,0,0,0,0,0,1,1,1],
      [0,0,0,0,0,0,1,1,1]
    ];
  };



  var normalize = function(pixel) { return pixel-0.5 };
  var unnormalize = function(pixel) { return pixel+0.5 };

  // Assumes arr is binary (or in the 0-1 range) and 2x2
  var arrToVol = function(arr, width, height) {
    var vol = new convnetjs.Vol(width, height, 1, 0.0);
    vol.w = flatten(arr).map(normalize);
    return vol;
  };

  var forward = function(net, inputVol) {
    var iter = net.forward(inputVol);
    return reshapeTo2D(iter.w.map(unnormalize), inputVol.sx, inputVol.sy);
  };

  // Assumes a neighbourhood is 3x3
  var getNumAliveNeighs = function(arr, x, y) {
    var numAliveNeighs = 0;
    for (var sx = Math.max(x-1, 0); sx <= Math.min(x+1, arr.length-1); sx++) {
      for (var sy = Math.max(y-1, 0); sy <= Math.min(y+1, arr[x].length-1); sy++) {
        if (arr[sx][sy] == 1 && !(sx == x && sy == y)) numAliveNeighs++;
      }
    }
    return numAliveNeighs;
  };

  var drawGrid = function(canvas, arr, threshold) {
    var ctx = canvas.getContext('2d');
    var width = arr.length;
    var height = arr[0].length;
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var normalizedX = Math.floor(x*canvas.width/width);
        var normalizedY = Math.floor(y*canvas.height/height);
        var normalizedYNext = Math.floor( (y+1)*canvas.height/height );
        var normalizedXNext = Math.floor( (x+1)*canvas.width/width );

        if (threshold) var intensity = Math.round(arr[x][y])*255;
        else           var intensity = Math.round(Math.max(arr[x][y]*255, 0));
        ctx.fillStyle = 'rgb('+intensity+','+intensity+','+intensity+')';
        ctx.fillRect( normalizedX, normalizedY, normalizedXNext, normalizedYNext );
      }
    }
  };

  var runGOLDemo = function(canvas) {
    var seed = 9;
    var random = function() {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    var getRndGOLState = function(width, height) {
      var res = [];
      for (var x = 0; x < width; x++) {
        res[x] = [];
        for (var y = 0; y < height; y++) {
          res[x][y] = Math.round(random());
        }
      }
      return res;
    };

    var golWidth = 65;
    var golHeight = 20;
    var golState = getRndGOLState(golWidth, golHeight);

    setInterval(function() {
      drawGrid(canvas, golState, false);
      golState = gol(golState);
    }, 100);
    setInterval(function() {
      seed++;
      golState = getRndGOLState(golWidth, golHeight);
    }, 30000);
  };

  var runSimulation = function(simCanvas, realCanvas, net, imgWidth, imgHeight) {
    var simState = getEndDemoInitState();
    var realState = getEndDemoInitState();
    var iters = 0;
    setInterval(function() {
      drawGrid( simCanvas, simState );
      simState = arrToVol(simState, imgWidth, imgHeight);
      var nextSimIter = round( forward(net, simState) );
      simState = nextSimIter;

      drawGrid( realCanvas, realState );
      realState = gol(realState);

      if (iters++ > 33) {
        simState = getEndDemoInitState();
        realState = getEndDemoInitState();
        iters = 0;
      }
    }, 1000);
  };

  var generateNet = function(imgWidth, imgHeight) {
    var layer_defs = [];
    layer_defs.push({ type: 'input', out_sx: imgWidth, out_sy: imgHeight, out_depth: 1 });
    layer_defs.push({ type: 'conv', sx: 3, filters: 20, activation: 'relu', stride: 1, pad: 1 });
    layer_defs.push({ type: 'regression', num_neurons: imgWidth*imgHeight });

    var net = new window.convnetjs.Net();
    net.makeLayers(layer_defs);

    return net;
  };

  var trainSeed = 1;
  var trainRnd = function() {
    var x = Math.sin(trainSeed++) * 10000;
    return x - Math.floor(x);
  };

  var generateTrainingExs = function(imgWidth, imgHeight, numDataPts) {
    var data = [], outputs = [];
    for (var i = 0; i < numDataPts; i++) {
      data[i] = [];
      for (var x = 0; x < imgWidth; x++) {
        data[i][x] = [];
        for (var y = 0; y < imgHeight; y++) {
          data[i][x][y] = Math.round(trainRnd()-0.2);
        }
      }
      outputs[i] = gol( data[i] );
    }
    return [ data, outputs ];
  };

  var trainNet = function(trainer, trainingData, imgWidth, imgHeight) {
    for (var i = 0; i < trainingData[0].length; i++) {
      var input = new convnetjs.Vol(imgWidth, imgHeight, 1, 0.0);
      input.w = flatten(trainingData[0][i]).map(normalize);
      var output = flatten(trainingData[1][i]).map(normalize);
      trainer.train(input, output);
    }
    return trainer;
  };

  var copyCanvas = function(canvas, canvasToCopyOnto) {
    var ctx = canvas.getContext('2d');
    var ctxExtra = canvasToCopyOnto.getContext('2d');
    ctxExtra.drawImage(canvas, canvas.width - canvasToCopyOnto.width, 0,
                               canvasToCopyOnto.width, canvasToCopyOnto.height,
                               0, 0, canvasToCopyOnto.width, canvasToCopyOnto.height);
  };

  var createCanvases = function(el, numCanvases, width, height) {
    var canvases = [];
    for (var i = 0; i < numCanvases; i++) {
      canvases[i] = window.document.createElement('canvas');
      canvases[i].width = width;
      canvases[i].height = height;
      el.appendChild(canvases[i]);
    }

    return canvases;
  };

  var drawNetWeights = function(net, div, canvases) {
    var filters = net.layers[1].filters;
    for (var i = 0; i < filters.length; i++) {
      var filt = reshapeTo2D(filters[i].w.map(unnormalize), filters[i].sx, filters[i].sy);
      drawGrid(canvases[i], filt);
    }
  };

  var runTraining = function(canvas, canvasRes, filtersDiv, canvasRes2, canvasDesired, canvasDiff, imgWidth, imgHeight) {
    var net = generateNet(imgWidth, imgHeight);
    var trainer = new convnetjs.Trainer(net, { method: 'adagrad', l2_decay: 0.001, batch_size: 4 });
    var filtCanvases = createCanvases(filtersDiv, net.layers[1].filters.length, 27, 27);

    var iterations = 0;
    setInterval(function() {
      //var batchTrainingExs = 50;
      var batchTrainingExs = 2;
      var data = generateTrainingExs(imgWidth, imgHeight, batchTrainingExs);
      trainer = trainNet(trainer, data, imgWidth, imgHeight);

      if (iterations++ % 4 == 0) {
        var input = data[0][0];
        var inputVol = arrToVol(input, imgWidth, imgHeight);
        drawGrid(canvas, input);

        var netOutput = forward(net, inputVol);
        drawGrid(canvasRes, netOutput);
        copyCanvas(canvasRes, canvasRes2);

        drawGrid(canvasDesired, data[1][0]);
        drawGrid(canvasDiff, diff(data[1][0], netOutput));

        drawNetWeights(net, filtersDiv, filtCanvases);
      }
    }, 200);
  };

  var getRndImg = function(width, height) {
    var res = [];
    for (var x = 0; x < width; x++) {
      res[x] = [];
      for (var y = 0; y < height; y++) {
        res[x][y] = Math.round(Math.random()-0.2);
      }
    }
    return res;
  };

  var linearFilter = function(arr, filt) {
    var res = [];
    for (var x = 0; x < arr.length; x++) {
      res[x] = [];
      for (var y = 0; y < arr[x].length; y++) {
        var weightedAverage = 0;
        for (var sx = Math.max(x-1, 0); sx <= Math.min(x+1, arr.length-1); sx++) {
          for (var sy = Math.max(y-1, 0); sy <= Math.min(y+1, arr[x].length-1); sy++) {
            weightedAverage += filt[sx-x+1][sy-y+1] * arr[sx][sy];
          }
        }
        res[x][y] = weightedAverage;
      }
    }
    return res;
  };

  var init = function() {

    var imgWidth = 9;
    var imgHeight = 9;

    var golDemo = window.document.getElementById('gol-demo');
    runGOLDemo(golDemo);

    var trainingDemo = window.document.getElementById('training');
    var trainingResDemo = window.document.getElementById('training-res');
    var filtersDiv = window.document.getElementById('filters-div');
    var trainingRes2Demo = window.document.getElementById('training-res-2');
    var trainingDesiredOutput = window.document.getElementById('training-desired-output');
    var trainingDiff = window.document.getElementById('training-diff');
    runTraining(trainingDemo, trainingResDemo, filtersDiv, trainingRes2Demo, trainingDesiredOutput, trainingDiff, imgWidth, imgHeight);

    getNetFromJSON('net.json', function(net) {
      var filtersPretrainedDiv = window.document.getElementById('filters-pretrained-div');
      var pretrainedFilters = createCanvases(filtersPretrainedDiv, net.layers[1].filters.length, 27, 27);
      drawNetWeights(net, filtersPretrainedDiv, pretrainedFilters);

      var patterns = [{ name: 'blinker', shape: getGOLFlipper() }, { name: 'toad', shape: getGOLZip() }, { name: 'glider', shape: getGOLGlider() }, { name: 'glider-2', shape: gol(gol(getGOLGlider())) }];
      for (var i = 0; i < patterns.length; i++) {
        var pattern = patterns[i];
        var patternEl = window.document.getElementById(pattern.name);
        var res = window.document.getElementById(pattern.name+'-res');
        var thres1 = window.document.getElementById(pattern.name+'-threshold-1');
        var thresRes = window.document.getElementById(pattern.name+'-thres-res');
        var thresResThres = window.document.getElementById(pattern.name+'-thres-res-thres');

        drawGrid(patternEl, pattern.shape);
        var patternNet = forward(net, arrToVol(pattern.shape, imgWidth, imgHeight));
        drawGrid(res, patternNet);
        var netThres = round(patternNet);
        drawGrid(thres1, netThres);
        var doubleNet = forward(net, arrToVol(netThres, imgWidth, imgHeight));
        drawGrid(thresRes, doubleNet);
        drawGrid(thresResThres, doubleNet, true);
      }

      var jewelEndDemo = window.document.getElementById('the-jewel');
      var realEndDemo  = window.document.getElementById('real-gol');
      runSimulation(jewelEndDemo, realEndDemo, net, imgWidth, imgHeight);
    });

    var p11 = window.document.getElementById('p11');
    var p12 = window.document.getElementById('p12');
    var p13 = window.document.getElementById('p13');
    var p21 = window.document.getElementById('p21');
    var p22 = window.document.getElementById('p22');
    var p23 = window.document.getElementById('p23');
    drawGrid(p11, getGOLFlipper());
    drawGrid(p12, gol(getGOLFlipper()));
    drawGrid(p13, getGOLFlipper());
    drawGrid(p21, getGOLZip());
    drawGrid(p22, gol(getGOLZip()));
    drawGrid(p23, getGOLZip());

    var currGlider = getGOLGlider();
    for (var i = 1; i <= 5; i++) {
      var gliderElement = window.document.getElementById('g'+i);
      drawGrid(gliderElement, currGlider);
      currGlider = gol(currGlider);
    }

    var kernelPre = window.document.getElementById('kernel-pre');
    var kernelPost = window.document.getElementById('kernel-post');
    var kernelImg = getRndImg(20, 20);
    drawGrid(kernelPre, kernelImg);
    var filteredImg = linearFilter(kernelImg, [[1/9,1/9,1/9],[1/9,1/9,1/9],[1/9,1/9,1/9]]);
    drawGrid(kernelPost, filteredImg);
  };

  init();

})(window);
