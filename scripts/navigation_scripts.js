var content = false

function is_mobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

function recent_activities(){

}

function cv_onclick(){
    var html_string = ''
    if (is_mobile()){
        html_string = "<div>Download my curriculum <a id='cv-link' href='../pdf/cv.pdf'>here</a></div>";
        content.html(html_string);
    }
    else {
        html_string="<div id='pdfcontainer'></div>"
        content.html(html_string);
        PDFObject.embed("../pdf/cv.pdf", "#pdfcontainer")
        $('.pdfobject-container').css("height", "25cm")
        $('.pdfobject-container').css("width", "100%")
        $('.pdfobject-container').css("margin", "auto")
    }

}

function validate_mail(email){
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}
function check_form_correctness(){
    if($('#input_name').val().length < 1) {return false}
    if(!validate_mail($('#input_mail').val())){return false}
    if($('#input_message').val().length < 1) {return false}
    return true
}

function send_mail(){
    if (check_form_correctness()){
        var templateParams = {
            name_form: $('#input_name').val(),
            message: $('#input_message').val(),
            email_form: $('#input_mail').val()
        };
        emailjs.send('service_wkolml4', 'template_ymhlcq4', templateParams)
            .then(function(response) {
                alert("Message sent. I'll write you as soon as I can")
                about_me_onclick()
            }, function(error) {
                alert('Error:', error);
            });
    }
    else {
        alert('Please fill all the forn fields')
    }
}

function contact_me_onclick(){
    show_page("../pages/contact_me.html")
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

function get_activity_image_filename(activity){
    if (activity.type == 'conference'){return 'conference.png'}
    if (activity.type == 'workshop'){return 'maintenance.png'}
    if (activity.type == 'project'){return 'pc.png'}
    if (activity.type == 'certificate'){return 'certificate.png'}
    if (activity.type == 'graduation'){return 'tocco.png'}
    if (activity.type == 'publication'){return 'article.png'}
}

function get_activity_date_string(activity){
    const date = new Date(activity.date)
    const month = date.getMonth() + 1; // getMonth() returns month from 0 to 11
    const year = date.getFullYear();
    var date_str = `${month}/${year}`;

    if (month < 10){date_str = '0'+date_str}
    return date_str
}

function get_card(activity){

    var date_str = get_activity_date_string(activity)
    var img_name = get_activity_image_filename(activity)



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
    var filePath = '../data/activities.json'
    var recent_act = $('#recent-activities-container')
    $.getJSON(filePath, function(json) {
        var activities = json.activities
        activities.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
        });
        var html_string = "<div class='row'>"
        for (let i = 0; i < 3; i++) {
            var activity = activities[i]
            var date_str = get_activity_date_string(activity)
            var filename = get_activity_image_filename(activity)

            var act_string = "<div class = 'col-sm-4 last-activity'>"+
                        "<div class = 'activity-icon-container'>"+
                        "<img src ='image/activity_icon/"+filename+"' width = '20%' alt='activity icon'>"+
                        "</div>"+
                        "<h3 class='last-activity-name'><a class='test' href='"+activity.link+"'>"+activity.name+"</a></h3>"+
                        "<div class='in_date'><p class='in-date'>"+date_str+"</p></div>"+
                        "<p class='last-activity-descr'>"+activity.description+"</p>"+
                        "</div>"
            html_string = html_string+act_string
        }
        html_string = html_string + "</div>"
        recent_act.html(html_string);
    });
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

    $("#contact-me-btn").click(function (){
        contact_me_onclick();
        nav_active('#contact-me-btn')
    })

    about_me_onclick()
    recent_activities()
});
