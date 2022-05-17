

var content = false

function cv_onclick(){
    var html_string="<div id='pdfcontainer'></div>"
    content.html(html_string);
    PDFObject.embed("../pdf/cv.pdf", "#pdfcontainer")
    $('.pdfobject-container').css("height", "25cm")
    $('.pdfobject-container').css("width", "100%")
    $('.pdfobject-container').css("margin", "auto")

}

function about_me_onclick(){
    show_page("../pages/about_me.html")
}

function show_page(html_file){
    $.get(html_file, function(html_string){
        console.log(content.style)
        content.html(html_string);
    },'html');
}

function nav_active(selector){
    $(".nav-item").removeClass('active')
    $(selector).parent().addClass('active')
}

function get_card(activity){
    const date = new Date(activity.date)
    const month = date.getMonth() + 1; // getMonth() returns month from 0 to 11
    const year = date.getFullYear();
    var date_str = `${month}/${year}`;

    if (month < 10){date_str = '0'+date_str}

    var img_name = null
    if (activity.type == 'conference'){img_name = 'conference.png'}
    if (activity.type == 'workshop'){img_name = 'maintenance.png'}
    if (activity.type == 'project'){img_name = 'pc.png'}
    if (activity.type == 'certificate'){img_name = 'certificate.png'}
    if (activity.type == 'graduation'){img_name = 'tocco.png'}



    var html_string = "<article class='episode'>"+
        "<div class='episode__number'>"+
        "<img src='./image/activity_icon/"+img_name+"'/>"+
        "</div><div class='episode__content'><div class='title'><a href='"+
        activity.link+"'>" +
        activity.name+
        "</a><br><br><div class='title-date'>" +
        date_str+
        "</div>"+
        "<br><div class='title-location'>" +
        activity.place+
        "</div>"+
        "</div><div class='story'>"+
        "<p>" +
        activity.description+
        "</p>"+
        "</div></div></article>"
    return html_string

}

function recent_activities(){
}

function activities_onclick(){
    var filePath = '../data/activities.json'
    $.getJSON(filePath, function(json) {
        var activities = json.activities
        activities.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
        });
        var html_string = "<div class='container-list'>"
        activities.forEach(function (item, index) {
            html_string = html_string + get_card(item)
        });
        html_string = html_string + "</div>"
        content.html(html_string);
    });
}


$(document).ready(function(){
    content = $('#content-div')
    $("#cv-btn").click(function (){
        cv_onclick();
        nav_active('#cv-btn')
    })

    $("#aboutme-btn").click(function (){
        about_me_onclick();
        nav_active('#aboutme-btn')
    })

    $("#activities-btn").click(function (){
        activities_onclick();
        nav_active('#activities-btn')
    })

    about_me_onclick()
});
