document.body.style.cursor = "auto"
Screen.backgroundColor = "#fff"

flipCard = require "flipCard"

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
  y: 120 + 20
  backgroundColor: "rgba(255,255,255,1)"
  x: 80

result_div.scroll = true

# srp result
srp_results = []
back_results = []

for i in [0..9]
  opts =
    width: 555
    height: 218
    y: (10+(i*218))
    x: 0
    parent: result_div
  if i == 1
    back_of_result_div = new Layer(
      Object.assign({
        image: "images/Screen Shot 2016-08-25 at 12.40.21 PM.png"
        rotationY: 180
      }, opts)
    )
  else
    back_of_result_div = new Layer(
      Object.assign({
        image: "images/Screen Shot 2016-08-25 at 12.35.56 PM.png"
        rotationY: 180
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

  if front and back
    flipCard.flipCard(front, back, 900, "spring(100,10,10)", result_div)
#     front.onSwipeLeft (event, layer) ->
#       back.destroy()
#       back.superLayer.destroy()
#       layer.animate
#         properties:
#             x: -600
#           curve: "ease"
#        layer.onAnimationEnd (event, layer) ->
#          next_results = srp_results.slice(layer.index)
#          for r in next_results
#            r.animate
#              properties:
#                y: r.y - r.height
#                curve: "ease"
#

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



# layerA = new Layer
# 	children: require("slide").slider()
# 	z:200
# 	width: 100
# 	height: 100
layerA = new Layer
	width: 737
	height: 640
	x: 459
	scale: 0.44
	y: -29
slider = require("slide").slider()
layerA.addChild(slider[0])
min = slider[1]
max = slider[2]


# layerA.style = width: '400px'i
# slider.on 'change:value', (event, layer) ->
#   console.log 'changing'


# slider.center()
analyzeGood = new Layer
  width: 371
  height: 109
  image: "images/Screen Shot 2016-08-24 at 2.50.28 PM.png"
  x: 665
  y: 446
#   rotationY: 180

# analyzeBad = new Layer
#   width: 366
#   height: 100
#   image: "images/Screen Shot 2016-08-24 at 2.27.15 PM.png"
#   x: 665
#   y: 165
analyzeGood.style.display = 'none'

max.onDragEnd ->
  showDealBadges()
  analyzeGood.style.display = 'block'
min.onDragEnd ->
  showDealBadges()
  analyzeGood.style.display = 'block'

# analyzeGood.style.display = 'none'
# analyzeBad.style.display = 'none'
