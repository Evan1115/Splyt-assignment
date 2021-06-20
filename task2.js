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

