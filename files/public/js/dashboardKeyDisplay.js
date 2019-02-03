let compareMap = {
    "courses": {
        "course": function(obj) {return obj.code},
        "teacher": function(obj) {return obj.teacher._id},
        "block": function(obj) {return obj.block},
        "semester": function(obj) {return obj.semester._id},
        "category": function(obj) {return obj.category._id},
    },
    "teachers": {
        "firstName": function(obj) {return obj.firstName},
        "lastName": function(obj) {return obj.lastName},
        "teacherCode": function(obj) {return obj.teacherCode},
        "prefix": function(obj) {return obj.prefix},
    },
    "categories": {
        "category": function(obj) {return obj.category},
    },
    "events": {
        "date": function(obj) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [year, month, day].join('-');
        },
        "dateString": function(obj) {
            var d = new Date(obj.date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [year, month, day].join('-');
        },
        "info": function(obj) {return obj.info},
        "time": function(obj) {
            let hour = parseInt(obj.time.split(":")[0]);
            let minute = parseInt(obj.time.split(":")[1]).toString();
            hour += obj.time.split(" ")[1] == "AM" ? 0 : 12;
            hour = hour.toString();
            hour = hour.length == 1 ? "0" + hour : hour;
            minute = minute.length == 1 ? "0" + minute : minute;
            return `${hour}:${minute}`;
        },
        "schoolSkipped": function(obj) {return obj.schoolSkipped ? "checked": "open"},
        "dayRolled": function(obj) {return obj.dayRolled ? "checked": "open"},
        "displayedEvent": function(obj) {return obj.displayedEvent ? "checked": "open"},
    }
}

let editMap = {
    "courses": {
        "course": function(obj) {return obj.course},
        "teacher": function(obj) {return obj.teacher.prefix + obj.teacher.lastName},
        "block": function(obj) {return obj.block},
        "semester": function(obj) {return obj.semester.name},
        "category": function(obj) {return obj.category.category},
    },
    "teachers": {
        "firstName": function(obj) {return obj.firstName},
        "lastName": function(obj) {return obj.lastName},
        "teacherCode": function(obj) {return obj.teacherCode},
        "prefix": function(obj) {return obj.prefix},
    },
    "categories": {
        "category": function(obj) {return obj.category},
    },
    "events": {
        "date": function(obj) {return obj.date},
        "dateString": function(obj) {return obj.dateString},
        "info": function(obj) {return obj.info},
        "time": function(obj) {return obj.time},
        "schoolSkipped": function(obj) {return obj.schoolSkipped ? "yes": "no"},
        "dayRolled": function(obj) {return obj.dayRolled ? "yes": "no"},
        "displayedEvent": function(obj) {return obj.displayedEvent ? "yes": "no"},
    }
}