
////////////////////////////////////// TASK 1 ///////////////////////////////////////

function add(a, b) {
    // console.log(b)
    return a + b
}

function defaultArguments(operator, value) {
    var b = value.b // b=3 //a=2
    var a = value.a

    return function (...v) {

        //v == 1 (v1, value.b)
        if (v.length == 1) {

            return operator(v[0], b) // add3(10) ->> call function(10,b) again with default b value
        }

        //v > 1 add(v1,v2)
        if (v.length > 1) {
            if (v[0] == undefined) { // add3(undefined,10)
                return operator(a, v[1])
            }

            return operator(v[0], v[1])
        }

        //v = 0 , add()
        if (v.length == 0) {
            // two condition - 1. add2() call function once : if either default a or b value is undefined , then add() will return undefined 
            //               - 2. add3() call function twice : if empty argument, then the default value (a,b) will be used to call add(a,b) , then add() will return a sum of a+b
            return operator(a, b)
        }
    }
}
const add2 = defaultArguments(add, { b: 9 })

console.log(add2(10) === 19)
console.log(add2(10, 7) === 17)
console.log(isNaN(add2()));

const add3 = defaultArguments(add2, { b: 3, a: 2 });
console.log(add3(10) === 13);
console.log(add3() === 5);  // 3 + 2 = 5  - both value zero 
console.log(add3(undefined, 10) === 12);

const add4 = defaultArguments(add, { c: 3 }); // doesn't do anything, since c isn't an argument
console.log(isNaN(add4(10)));
console.log(add4(10, 10) === 20);
console.log("")


////////////////////////////// TASK 2 ///////////////////////////////////////////////////////////

let schedules = [
    [['09:30', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
    [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
    [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
]

function getAppointmentTime(schedules, duration) {
    let resultArr = []
    let max

    for (let i = 0; i < schedules.length; i++) {
        // let count = 0
        let arr = []
        resultArr[i] = []
        schedules[i].forEach((element, index) => {
            let timeDiff
            let earliestMinute
            let time1
            let time2

            //first time checks 9am
            if (index == 0) {
                time1 = getMinutes("9:00")
                time2 = getMinutes(element[0])
            }

            //last time checks 7pm
            if (index == schedules[i].length - 1) {
                time1 = getMinutes(element[1])
                time2 = getMinutes("19:00")
            }

            //normal condition
            arr.push(element)
            if (0 < index && index < schedules[i].length - 1) {
                time1 = getMinutes(arr[index - 1][1])
                time2 = getMinutes(element[0])
            }

            timeDiff = time2 - time1
            earliestMinute = time1
            //store time diff and starting time(minutes)
            resultArr[i].push([timeDiff, earliestMinute])
        });


        //find max length of the resultArr
        if (i > 0) {
            max = Math.max(resultArr[i].length, max)
        }

        if (i == 0) {
            max = resultArr[i].length
        }
    }


    //loop thro the resultArr to compare the time diff with the duration given
    for (let i = 0; i < max; i++) {
        let count = 0
        let target = resultArr.length
        for (let j = 0; j < resultArr.length; j++) {
            //check null

            //if it exists
            if (resultArr[j][i]) {

                if (resultArr[j][i][0] > duration) count++  //check if the time is larger than the duration given
            } else {
                return null //if one of them is undefined when the timetable length for each person is not same
            }
        }

        //check if all the time diff are larger than the duration given
        if (count === target) return findMax(resultArr, i)
    }
    return null //if cannot find a time to fit the duration
}

function findMax(arr, location) {
    let max
    arr.forEach((e, index) => {

        if (index > 0) {
            max = Math.max(max, arr[index][location][1])
        } else {
            max = arr[index][location][1]
        }
    })
    return timeConvert(max)
}


function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + ":" + rminutes
}

function getMinutes(time) {
    var timeSplit = time.split(":")
    var timeMinute = parseInt(timeSplit[0] * 60) + parseInt(timeSplit[1])
    return timeMinute
}

console.log("The Earliest Time is : " + getAppointmentTime(schedules, 60))

