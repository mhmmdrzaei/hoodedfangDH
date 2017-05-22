'use strict';

// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);

// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'http://www.mohammadrezaei.com/aprildownloads/',
            extension = '',
            tracks = [{
            "track": 1,
            "name": "Queen of Agusan del Norte",
            "length": "3:19",
            "file": "queen"
        }, {
            "track": 2,
            "name": "Sister and Suns",
            "length": "3:49",
            "file": "sister"
        }, {
            "track": 3,
            "name": "Nene Of The Light",
            "length": "6:25",
            "file": "nene"
        }, {
            "track": 4,
            "name": "Paramaribo Prince",
            "length": "3:45",
            "file": "paramaribo"
        }, {
            "track": 5,
            "name": "Doñamelia",
            "length": "3:10",
            "file": "dona"
        }, {
            "track": 6,
            "name": "Mama Pearl",
            "length": "5:52",
            "file": "mama"
        }],
            buildPlaylist = $.each(tracks, function (key, value) {
            var trackNumber = value.track,
                trackName = value.name,
                trackLength = value.length;
            if (trackNumber.toString().length === 1) {
                trackNumber = '0' + trackNumber;
            } else {
                trackNumber = '' + trackNumber;
            }
            $('#plList').append('<li data-toggle="#numb' + trackNumber + '"><div class="plItem"><div class="plNum">' + trackNumber + '.</div><div class="plTitle">' + trackName + '</div><div class="plLength">' + trackLength + '</div></div></li>');
        }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
            playing = true;
            npAction.text('Now Playing...');
        }).bind('pause', function () {
            playing = false;
            npAction.text('Paused...');
        }).bind('ended', function () {
            npAction.text('Paused...');
            if (index + 1 < trackCount) {
                index++;
                loadTrack(index);
                audio.play();
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }).get(0),
            btnPrev = $('#btnPrev').click(function () {
            if (index - 1 > -1) {
                index--;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
            btnNext = $('#btnNext').click(function () {
            if (index + 1 < trackCount) {
                index++;
                loadTrack(index);
                if (playing) {
                    audio.play();
                }
            } else {
                audio.pause();
                index = 0;
                loadTrack(index);
            }
        }),
            li = $('#plList li').click(function () {
            var id = parseInt($(this).index());
            if (id !== index) {
                playTrack(id);
            }
        }),
            loadTrack = function loadTrack(id) {
            $('.plSel').removeClass('plSel');
            $('#plList li:eq(' + id + ')').addClass('plSel');
            npTitle.text(tracks[id].name);
            index = id;
            audio.src = mediaPath + tracks[id].file + extension;
        },
            playTrack = function playTrack(id) {
            loadTrack(id);
            audio.play();
        };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});
// curved svg 
// $(document).ready(function(){
//   var $oneAppend = $('<video loop muted autoplay poster="assets/one.png" class="fullscreen-bg__video"><source src="assets/one.mp4" type="video/mp4"><source src="assets/one.ogv" type="video/ogg"></video>');
//   var $twoAppend = $('<video loop muted autoplay poster="assets/two.png" class="fullscreen-bg__video"><source src="assets/two.mp4" type="video/mp4"><source src="assets/two.ogv" type="video/ogg"></video>');
//   var $threeAppend = $('<video loop muted autoplay poster="assets/three.png" class="fullscreen-bg__video"><source src="assets/three.mp4" type="video/mp4"><source src="assets/three.ogv" type="video/ogg"></video>');

//   if ($('#numb01').hasClass('plSel')) {
//     // $('fullscreen-bg').removeClass('one');
//     // $('fullscreen-bg').addClass('two', 'three', 'four' ,'five','six');
//     $oneAppend.appendTo('#fuckoff');
//     $twoAppend.remove();
//     $threeAppend.remove();
//    } 

//   if ($('#numb02').hasClass('plSel')) {
//     // $('fullscreen-bg').removeClass('one');
//     // $('fullscreen-bg').addClass('two', 'three', 'four' ,'five','six');
//     $oneAppend.remove();
//     $threeAppend.remove();
//     $twoAppend.appendTo('#fuckoff');
//    } 
//   if ($('#numb03').hasClass('plSel')) {
//     // $('fullscreen-bg').removeClass('one');
//     // $('fullscreen-bg').addClass('two', 'three', 'four' ,'five','six');
//     $threeAppend.appendTo('#fuckoff');
//     $oneAppend.remove();
//     $twhoAppend.remove();
//    } 

// });


function curvedText(time) {
    var tl = new TimelineMax({ repeat: -1 });
    var text = document.querySelector('svg textpath'),
        path = document.querySelector('svg defs path');

    var from = {
        transformOrigin: 'center center',
        rotation: 0
    };

    var to = {
        rotation: 360,
        ease: Linear.easeInOut
    };

    tl.fromTo([text, path], time, from, to);

    return tl;
}

curvedText(20);

//toggle of things
$(document).on('click', '[data-toggle]', function () {
    var targetId = $(this).data('toggle');
    targetId = $(targetId);
    var index = targetId.index();

    targetId.show().siblings().hide();
    $('.fullscreen-bg:eq(' + index + ')').show().siblings().hide();
});