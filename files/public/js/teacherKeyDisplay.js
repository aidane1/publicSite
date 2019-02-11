let compareMap = {
    "course": {
        "course": function(obj) {return obj.code},
        "teacher": function(obj) {return obj.teacher._id},
        "block": function(obj) {return obj.block},
        "semester": function(obj) {return obj.semester._id},
        "category": function(obj) {return obj.category._id},
    },
    "assignment": {
        "topic": function(obj) {return obj.topic},
        "type": function(obj) {return obj.type},
        "assignment": function(obj) {return obj.type == "text" ? obj.assignment : obj.assignment.split("_").slice(0, obj.assignment.split("_").length-1).join("_")},
        "notes": function(obj) {return obj.notes},
        "due": function(obj) {return obj.due},
    }
}

let editMap = {
    "assignment": {
        "topic": function(obj) {return obj.topic},
        "type": function(obj) {return obj.type},
        "assignment": function(obj) {return obj.type == "text" ? obj.assignment.replace(/(\r\\n|\n|\r)/gm, "<br>") : `${obj.assignment.split("_").slice(0, obj.assignment.split("_").length-1).join("_").replace(/(\r\\n|\n|\r)/gm, "<br>")}<a href = '/public/assignments/${obj.assignment.split("_").slice(obj.assignment.split("_").length-1, obj.assignment.split("_").length).join("_")}'>(file)</a>`},
        "notes": function(obj) {return obj.notes.replace(/(\r\\n|\n|\r)/gm, "<br>")},
        "due": function(obj) {return obj.due},

    },
}