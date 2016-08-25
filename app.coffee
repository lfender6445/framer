document.body.style.cursor = "auto"
flipCard = require "flipCard"
Screen.backgroundColor = "#fff"
budget = 'bad'; budget = 'good'

# as a user
# when i manipulate price slider
# i can see deal text appear on the listings

# as a user
# when i click on the deal test
# i can analyze costs

# -------------------- menu
nav = new Layer
  width: 1034
  height: 130
  image: "images/Screen Shot 2016-08-24 at 10.14.42 AM.png"
  x: -8
  y: -1

result_div = new Layer
  width: 1034
  height:727
  y: 120
  backgroundColor: "rgba(255,255,255,1)"

result_div.scroll = true

# srp result
srp_results = []
back_results = []

for i in [0..9]
  opts =
    width: 555
    height: 218
    y: (50+(i*218))
    x: 80
    parent: result_div
  back_of_result_div = new Layer(
    Object.assign({
      html: 'back of card'
      backgroundColor: "black"
    }, opts)
  )
  result_img = new Layer(
    Object.assign({
      image: "images/Screen Shot 2016-08-24 at 10.17.43 AM.png"
    }, opts)
  )
  srp_results.push  result_img
  back_results.push back_of_result_div

for result, i in srp_results
  front = result
  back = back_results[i]
#   flipCard.flipCard(front, back, 1600, "spring(300,20,0)")
  result.onSwipeLeft (event, layer) ->
    layer.animate
        properties:
          x: -600
        curve: "ease"
      layer.onAnimationEnd (event, layer) ->
        next_results = srp_results.slice(layer.index)
        for r in next_results
          r.animate
            properties:
              y: r.y - r.height
            curve: "ease"

green = new Layer
  width: 20
  height: 33
  x: 410
  y: 45
  parent: srp_results[0]
  image: "images/dealArrows_sprite [www.imagesplitter.net] (3).png"

red = new Layer
  width: 18
  height: 33
  image: "images/dealArrows_sprite [www.imagesplitter.net] (4).png"
  x: 410
  y: 45
  parent: srp_results[1]

yellow = new Layer
  width: 20
  height: 34
  image: "images/dealArrows_sprite [www.imagesplitter.net] (2).png"
  parent: srp_results[2]
  x: 410
  y: 45

good = new Layer
  html: 'Good Deal'
  parent: srp_results[0]
  backgroundColor: "rgba(0,255,0,0)"
  color: '00BB01'
  x: 435
  y: 43
  height: 102
  width: 219

bad = new Layer
  html: 'Top of budget'
  parent: srp_results[1]
  backgroundColor: "rgba(0,255,0,0)"
  color: 'F22E1F'
  x: 435
  y: 45
  height: 93
  width: 219

fair = new Layer
  html: 'Fair'
  parent: srp_results[2]
  backgroundColor: "rgba(0,255,0,0)"
  color: 'D7E031'
  x: 435
  y: 45
  height: 93
  width: 219

badges = [good, bad, fair, green, red, yellow]

openModal = ->
  console.log('opening modal')

for b in badges
  b.on 'click', -> openModal()
  b.style =
    fontSize: '15px'
    display: 'none'

showDealBadges = =>
  for b in badges
    b.style =
      display: 'block'

# ----------- right rail
slider = new SliderComponent
    min: 0
    max: 1
    value: 0.5
    knobSize: 30
    x: 665
    y: 300

slider.on 'change:value', (event, layer) ->
  console.log 'changing'
  showDealBadges()


# slider.center()
analyzeBad = new Layer
  width: 366
  height: 100
  image: "images/Screen Shot 2016-08-24 at 2.27.15 PM.png"
  x: 665
  y: 165

analyzeGood = new Layer
  width: 371
  height: 109
  image: "images/Screen Shot 2016-08-24 at 2.50.28 PM.png"
  x: 647
  y: 170

analyzeGood.style.display = 'none'
analyzeBad.style.display = 'none'

if budget == 'bad'
  analyzeBad.style.display = 'block'
else
  analyzeGood.style.display = 'block'