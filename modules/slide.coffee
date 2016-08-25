exports.slider = ->
  widget = new Layer
    height: 650
    width: 750

  graph = new Layer
    parent: widget
    width: 506
    height: 400
    x: 122
    y: 49
    #backgroundColor: "rgba(255,255,255,1)"

  slider = new Layer
    parent: widget
    height: 98
    width: 750
    y: 465
    #backgroundColor: "rgba(255,255,255,1)"

  sliderArea = new Layer
    parent: slider
    height: 60
    width: 545
    x: 103
    y: 17
    #backgroundColor: "rgba(125,125,125,1)"

  sliderBar = new Layer
    parent: sliderArea
    height: 13
    width: 545
    y: 25
    backgroundColor: "rgba(48,31,255,0.8)"

  priceBar = new Layer
    parent: widget
    width: 545
    height: 54
    y: 580
    x: 103

  createSlider = (x) ->
    slider = new Layer
      parent: sliderArea
      height: 60
      width: 32
      x: x
      backgroundColor: "rgba(55,152,197,0.5)"

    slider.draggable.vertical = false
    slider.draggable.constraints =
      width: 545
    slider.draggable.overdrag = false
    slider.draggable.momentum = false
    return slider

  addBars = (ranges) ->
    width = Math.floor((graph.width - 5) / ranges.length)
    bars = []
    for i in ranges
      n = ranges.indexOf(i)
      layer = new Layer
        width: 40
        height: 0
        x: 5 + width * n
        y: 5
        backgroundColor: "rgba(89,233,5,100)"
      bars.push(layer)
      graph.addChild(layer)
    graph.rotationX = 180
    return bars

  drawPrices = (ranges) ->
    width = Math.floor((priceBar.width - 5) / ranges.length)
    prices = ranges.map(extractPrice)
    # priceBar
    for i in ranges
      n = ranges.indexOf(i)
      price = prices[n]
      priceLayer = new Layer
        height: 15
        width: 35
        x: 5 + width * n
        y: 5

      if price >= 1000
        priceLayer.html = "" + (price / 1000) + "k"
      else
        priceLayer.html = price
      priceBar.addChild(priceLayer)

  max = (numbers) ->
    numbers.reduce (largest, price) ->
      if price > largest
        price
      else
        largest

  extractPrice = (step, i) ->
    return step[0]

  extractCount = (step, i) ->
    return step[1]

  drawGraph = (range, bars, options) ->
    maxHeight = graph.height - 10
    maxCount = max(range.map(extractCount))
    for i in range
      n = range.indexOf(i)
      price = i[0]
      count = i[1]
      color = options["activeColor"]

      if n < options["goneBefore"] or n > options["goneAfter"]
        count = 0
      else if n < options["disabledBefore"] or n > options["disabledAfter"]
        color = options["disabledColor"]

      bars[n].height = count/maxCount * maxHeight
      bars[n].backgroundColor = color

  updateState = (slider, property) ->
    state[property] = Math.round(slider.point["x"] / 55)
    drawGraph(priceRange, bars, state)

  priceRange = [
    [500, 4],
    [700, 8],
    [900, 12],
    [1100, 15],
    [1300, 20],
    [1500, 25],
    [2000, 28],
    [3000, 20],
    [4000, 4],
    [5000, 1],
  ]

  sliderMin = createSlider(0)
  sliderMax = createSlider(513)

  state = {
    activeColor: "green"
    disabledColor: "yellow"
    disabledBefore: 0,
    disabledAfter: 9,
    goneBefore: 0,
    goneAfter: 9,
  }

  drawPrices(priceRange)
  bars = addBars(priceRange)
  drawGraph(priceRange, bars, state)

  sliderMin.onDrag -> updateState(this, "disabledBefore")
  sliderMin.onDragEnd -> updateState(this, "goneBefore")
  sliderMax.onDrag -> updateState(this, "disabledAfter")
  sliderMax.onDragEnd -> updateState(this, "goneAfter")
  [widget, sliderMin, sliderMax]
