exports.flipCard = (front, back, perspective, flipCurve, resultContainer) ->
  perspectiveLayer = new Layer
    width: front.width
    height: front.height
    x: front.x
    y: front.y
    backgroundColor: "transparent"
    superLayer: resultContainer

  # perspectiveLayer.style = border: '1px red solid'

  resultContainer.perspective = perspective
  container = new Layer
      width: front.width
      height: front.height
      backgroundColor: "transparent"
      superLayer: perspectiveLayer

  # container.style = border: '1px blue solid'
  back.superLayer = container
  front.superLayer = container
  front.x = 0
  front.y = 0
  back.x = 0
  back.y = 0
  front.states.add
      front: {opacity: 1}
      back: {opacity: 0}
  front.states.animationOptions =
    curve: flipCurve
  front.states.switchInstant("front")

  back.states.add
      front: {opacity: 0}
      back: {opacity: 1}
  back.states.animationOptions =
    curve: flipCurve

  container.states.add
      front: {rotationY: 0}
      back: {rotationY: 180}
  container.states.animationOptions =
    curve: flipCurve
  container.states.switchInstant("front")
  container.on Events.Click, ->
    console.log 'trigger flip'
    this.states.next(["back","front"])
    front.states.next(["back","front"])
