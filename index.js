/*
		numb is a static array I use as a look up table (LUT):
		each cell contains the positions of hand clocks of every circle composing the number.
		Example: numb[1][6] contains a 2-cell array ([2,6]) of the 6th circle for the number 1 we try to draw.
		[2,6] means the first hand will have the class present in orientationClasses array at the index 2 ('rot-90') and the second hand will have the index 6 ('rot-270').
    If there is a third cell with -1, it means this circle should not be visible
	*/
const numb = [
  [
    //0
    [4, 6],
    [0, 4],
    [0, 6],
    [2, 6],
    [2, 6],
    [2, 6],
    [2, 6],
    [2, 6],
    [2, 6],
    [2, 6],
    [2, 6],
    [2, 6],
    [2, 6],
    [2, 6],
    [2, 6],
    [2, 4],
    [0, 4],
    [0, 2],
  ],
  [
    //1
    [4, 6],
    [0, 4],
    [0, 6],
    [2, 4],
    [0, 6],
    [2, 6],
    [7, 7, -1],
    [2, 6],
    [2, 6],
    [7, 7, -1],
    [2, 6],
    [2, 6],
    [7, 7, -1],
    [2, 6],
    [2, 6],
    [7, 7, -1],
    [2, 4],
    [0, 2],
  ],
  [
    //2
    [4, 6],
    [0, 4],
    [0, 6],
    [2, 4],
    [0, 6],
    [2, 6],
    [7, 7, -1],
    [2, 7],
    [2, 7],
    [3, 6],
    [3, 6],
    [7, 7, -1],
    [2, 6],
    [2, 4],
    [0, 6],
    [2, 4],
    [0, 4],
    [0, 2],
  ],
  [
    //3
    [4, 6],
    [0, 4],
    [0, 6],
    [2, 4],
    [0, 6],
    [2, 6],
    [4, 6],
    [0, 2],
    [2, 6],
    [2, 4],
    [0, 6],
    [2, 6],
    [4, 6],
    [0, 2],
    [2, 6],
    [2, 4],
    [0, 4],
    [0, 2],
  ],
  [
    //4
    [4, 6],
    [0, 6],
    [0, 6],
    [2, 6],
    [2, 6],
    [2, 6],
    [2, 6],
    [2, 4],
    [2, 6],
    [2, 4],
    [0, 6],
    [2, 6],
    [7, 7, -1],
    [2, 6],
    [2, 6],
    [7, 7, -1],
    [2, 4],
    [0, 2],
  ],
  [
    //5
    [4, 6],
    [0, 4],
    [0, 6],
    [2, 6],
    [4, 6],
    [0, 2],
    [2, 5],
    [2, 5],
    [5, 5, -1],
    [5, 5, -1],
    [1, 6],
    [1, 6],
    [4, 6],
    [0, 2],
    [2, 6],
    [2, 4],
    [0, 4],
    [0, 2],
  ],
  [
    //6
    [4, 6],
    [0, 4],
    [0, 6],
    [2, 6],
    [4, 6],
    [0, 2],
    [2, 6],
    [2, 6],
    [5, 5, -1],
    [2, 6],
    [2, 4],
    [0, 6],
    [2, 6],
    [0, 4],
    [2, 6],
    [2, 4],
    [0, 4],
    [0, 2],
  ],
  [
    //7
    [4, 6],
    [0, 4],
    [0, 6],
    [2, 4],
    [0, 6],
    [2, 6],
    [7, 7, -1],
    [2, 7],
    [2, 7],
    [3, 6],
    [3, 6],
    [7, 7, -1],
    [2, 6],
    [2, 6],
    [7, 7, -1],
    [2, 4],
    [0, 2],
    [7, 7, -1],
  ],
  [
    //8
    [4, 6],
    [0, 4],
    [0, 6],
    [2, 6],
    [0, 4],
    [2, 6],
    [2, 5],
    [5, 7],
    [2, 7],
    [3, 6],
    [1, 3],
    [1, 6],
    [2, 6],
    [0, 4],
    [2, 6],
    [2, 4],
    [0, 4],
    [0, 2],
  ],
  [
    //9
    [4, 6],
    [0, 4],
    [0, 6],
    [2, 6],
    [0, 4],
    [2, 6],
    [2, 4],
    [0, 6],
    [2, 6],
    [7, 7, -1],
    [2, 6],
    [2, 6],
    [4, 6],
    [0, 2],
    [2, 6],
    [2, 4],
    [0, 4],
    [0, 2],
  ],
]

const orientationClasses = [
  'rot-0',
  'rot-45',
  'rot-90',
  'rot-135',
  'rot-180',
  'rot-225',
  'rot-270',
  'rot-315',
]

function changeNumber(number, nts) {
  const nb = document.getElementsByClassName('number')[number - 1]
  // foreach circle within a number
  Array.from(nb.getElementsByClassName('circle')).forEach((circle, idx) => {
    const hands = numb[nts][idx]
    if (hands.length === 3) {
      circle.className = 'circle inactive'
    } else {
      // for each clock hand of the circle
      Array.from(circle.getElementsByClassName('hand')).forEach((hd, jdx) => {
        // apply the appropriate class
        hd.className = 'hand ' + orientationClasses[hands[jdx]]
      })
      circle.className = 'circle'
    }
  })
}

function updateTime() {
  const today = new Date(),
    hours = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds()

  changeNumber(1, parseInt(hours / 10))
  changeNumber(2, parseInt(hours % 10))
  changeNumber(3, parseInt(min / 10))
  changeNumber(4, parseInt(min % 10))
  changeNumber(5, parseInt(sec / 10))
  changeNumber(6, parseInt(sec % 10))
}

window.setInterval(updateTime, 1000)
