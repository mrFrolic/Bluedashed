//getShotsForID('denav', 'lucasmarinm', 'content', '3');

var url = 'http://api.dribbble.com/players/denav?callback=franfran';
var myscript = document.createElement('script');
myscript.src = url;
document.body.appendChild(myscript);

var nb_shots_f, nb_shots_l;
var nb_shots_max = 30;
var shots_f = [];

var htmlString = "\n<ul>\n"

function franfran (infos){
    var url = 'http://api.dribbble.com/players/lucasmarinm?callback=lulu';


    if ( infos.shots_count <= 30){
        nb_shots_f = infos.shots_count;
    }else{
        nb_shots_f = nb_shots_max;
    }
    var myscript = document.createElement('script');
    myscript.src = url;
    document.body.appendChild(myscript);

}

function lulu (infos){
    if ( infos.shots_count <= 30){
        nb_shots_l = infos.shots_count;
    }else{
        nb_shots_l = nb_shots_max;
    }
    get_f();
}

function get_f (){
    var url = 'http://api.dribbble.com/players/denav/shots?per_page=30&callback=parse_f';
    var shots = [];

    var myscript = document.createElement('script');
    myscript.src = url;
    document.body.appendChild(myscript);
}

function parse_f (shots){
    var nblike = 0;
    for (var j = 3; j < nb_shots_f ; j++){
        //console.log(shots.shots[j])
        if(shots.shots[j].likes_count >= nblike){
            shots_f = [];
            shots_f.push(shots.shots[j]);

            nblike = shots.shots[j].likes_count;
        }
    }
     for (var i = 0; i < 3; i++)
     {
         var shot = shots.shots[i];
         shots_f.push(shot);
     }

    var url = 'http://api.dribbble.com/players/lucasmarinm/shots?per_page=30&callback=parse_l';
    var shots = [];

    var myscript = document.createElement('script');
    myscript.src = url;
    document.body.appendChild(myscript);

}

function parse_l (shots){
    var nblike = 0;
    for (var j = 3; j < nb_shots_l ; j++){
        if(shots.shots[j].likes_count >= nblike){
            shots_l = [];
            shots_l.push(shots.shots[j]);

            nblike = shots.shots[j].likes_count;
        }
    }
    for (var i = 0; i < 3; i++)
    {
        var shot = shots.shots[i];
        shots_l.push(shot);
    }
    console.log('franfran:');
    console.log(shots_f);
    console.log('lulu:');
    console.log(shots_l);

    display_shots()
}

function display_shots(){

    var is_gif = /.gif$/ ;

    for (var i = 0; i < 4; i++)
    {
        var shot = shots_f[i];
        htmlString = htmlString+"\n<li class=\"dribbble_shot\">";
        htmlString = htmlString+"<a href=\""+shot.url+"\">";
        if(shot.image_400_url && !is_gif.test(shot.image_400_url)){
            htmlString = htmlString+"<img src=\""+shot.image_400_url+"\" alt=\""+shot.title+"\" />";
        }else{
            htmlString = htmlString+"<img src=\""+shot.image_url+"\" alt=\""+shot.title+"\" />";
        }
        htmlString = htmlString+"<div class=\"shot_hover_infos\">"
                                 +"<img src=\"" + shot.player.avatar_url +"\"/>" +"<br/>"
                                 +shot.likes_count + " &hearts;</div>";
        htmlString = htmlString+"</a>";
        htmlString = htmlString+"</li>\n";

        var shot_l = shots_l[i];
        htmlString = htmlString+"\n<li class=\"dribbble_shot\">";
        htmlString = htmlString+"<a href=\""+shot_l.url+"\">";
        if(shot_l.image_400_url && !is_gif.test(shot_l.image_400_url)){
            htmlString = htmlString+"<img src=\""+shot_l.image_400_url+"\" alt=\""+shot.title+"\" />";
        }else{
            htmlString = htmlString+"<img src=\""+shot_l.image_url+"\" alt=\""+shot.title+"\" />";
        }
        htmlString = htmlString+"<div class=\"shot_hover_infos\">"
                                 +"<img src=\"" + shot_l.player.avatar_url +"\"/>" +"<br/>"
                                 +shot_l.likes_count + " &hearts;</div>";
        htmlString = htmlString+"</a>";
        htmlString = htmlString+"</li>\n";
    }
    htmlString = htmlString + "\n</ul>\n" + "<div class=\"shots_arrow_l\">&#9664;</div><div class=\"shots_arrow_r\">&#9654;</div>";
    document.getElementById('content').innerHTML = htmlString;

    arrows_go()
}

function arrows_go(){

    $('.shots_arrow_l').css('display','none');
    $('.shots_arrow_r').click(function(){
        if ($('#content > ul').css('marginLeft') == '0px'){
            $('.shots_arrow_l').css('display','block');
        }
        if ($('#content > ul').css('marginLeft') == '-1215px'){
            $('.shots_arrow_r').css('display','none');
        }
        if ($('#content > ul').css('marginLeft') != '-1620px'){
            $('#content > ul').animate({"margin-left": "-=405px"}, 200);
        }
    });
    $('.shots_arrow_l').click(function(){
        if ($('#content > ul').css('marginLeft') == '-1620px'){
            $('.shots_arrow_r').css('display','block');
        }
        if ($('#content > ul').css('marginLeft') == '-405px'){
            $('.shots_arrow_l').css('display','none');
        }
        if ($('#content > ul').css('marginLeft') != '0px'){
            $('#content > ul').animate({"margin-left": "+=405px"}, 200);
        }
    });

}

