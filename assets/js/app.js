$(document).ready(function()
{

    const themes_color = {
        default: {
            "text-color": "black",
            "text-theme-color": "white",
            "theme-color": "#560303",
            "theme-color-opacity": "rgba(90,2,2,0.8)"
        },
        "dark-blue": {
            "text-color": "black",
            "text-theme-color": "white",
            "theme-color": "#02133d",
            "theme-color-opacity": "rgba(2,7,61,0.8)"
        },
        "brown": {
            "text-color": "black",
            "text-theme-color": "white",
            "theme-color": "#3d2302",
            "theme-color-opacity": "rgba(61,29,2,0.8)"
        },
        "orange": {
            "text-color": "black",
            "text-theme-color": "white",
            "theme-color": "#b96900",
            "theme-color-opacity": "rgba(185,105,0,0.8)"
        }
    };


    const theme_settings = $(".theme-settings");
    Object.keys(themes_color).forEach(function(key)
    {
        theme_settings.html(`${theme_settings.html()} <div class="theme ${key}" style="background-color:${themes_color[key]["theme-color"]}"></div>`);
    });

    const set_theme = function(theme)
    {
        Object.keys(theme).forEach(function(key)
        {
            document.documentElement.style.setProperty(`--${key}`, theme[key]);
        });
    }
    set_theme(themes_color["default"])

    const skills = {
        frontend: {
            html5: 90,
            css3: 70,
            javascript: 40
        },
        backend: {
            php: 70,
            symfony: 30,
            django: 20
        },
        software: {
            git: 50,
            github: 60,
            figma: 30
        },
        os: {
            linux: 70,
            windows: 80,
            macos: 70
        },
        other: {
            python: 70,
            c: 20,
            cpp: 30,
            cs: 50
        }

    };

    const init_s_value = function(el, value, parent = null) {
        if (parent)
        {
            let i = 0;
            do {
                el = el.parent();
                i++;
            }while(i < parent);

            el = el.find(".value");
        }
        el.css("width", value);
    };


    const s_average = function(name)
    {
        let average = 0;
        let count = 0;
        Object.keys(skills[name]).forEach(function(key)
        {
            average += skills[name][key];
            count++;
        });
        average /= count;

        return average;
    }

    const reset_s = function(name, el = null, parent = null)
    {
        init_s_value((el) ? el : $(`.${name}`), `${s_average(name)}%`, parent);

    }


    const counter = function(el, final_value, timeout)
    {
        setInterval(() =>
        {
            let el_value = Number(el.text());

            if (el_value < final_value)
                el.text(++el_value);
        }, timeout);
    };

    counter($(".frontend-score"), s_average("frontend"), 30);
    counter($(".backend-score"), s_average("backend"), 30);
    counter($(".software-score"), s_average("software"), 30);
    counter($(".os-score"), s_average("os"), 30);
    counter($(".other-score"), s_average("other"), 30);

    const ratio = .1;
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: ratio
    };

    const interaction_callback = (entries, observer) =>
    {
        entries.forEach((entry) =>
        {
            if (entry.intersectionRatio > ratio)
            {
                if (entry.target.classList.contains('score'))
                {
                    reset_s("frontend", null, 1);
                    reset_s("backend", null, 1);
                    reset_s("software", null, 1);
                    reset_s("os", null, 1);
                    reset_s("other", null, 1);

                }


                if (!entry.target.classList.contains('score'))
                {
                    entry.target.classList.add("anim-show");
                    if (!($(window).width() < 1041 && (entry.target.classList.contains('aside-header') || entry.target.classList.contains('aside-content'))))
                    {
                        observer.unobserve(entry.target);
                    }
                }
            }
        });
    }

    const observer = new IntersectionObserver(interaction_callback, options);
    const anim_element = (selector) =>
    {
        document.querySelectorAll(selector).forEach((el) =>
        {
            observer.observe(el);
        });
    };

    anim_element(".anim-hidden");
    anim_element(".score");

    $(".theme-button").click(function ()
    {
        theme_settings.toggleClass("show");
    });

    $(".theme").each(function()
    {
        $(this).click(() =>
        {
            if (document.querySelector(".theme-settings").classList.contains("show"))
            {
                let t_name = $(this)[0].classList[1];
                set_theme(themes_color[$(this)[0].classList[1]]);
                theme_settings.toggleClass("show");
            }
        });
    });

    $(".w-img").hover(function ()
    {
        $(this).find("img").css("transform", "scale(1.1)");
    }, function ()
    {
        $(this).find("img").css("transform", "scale(1)");
    });

    let type_writer = function(el, text, delay, text_position = 0)
    {
        el.text(text.substring(0 , text_position));
        if (text_position++ != text.length)
        {
            setInterval(type_writer(el, text, delay, text_position), delay);
        }
    };


    $(".s-icon").hover(function ()
    {
        let value = `${skills[$(this).parent().attr("class").split(' ')[1]][$(this).attr('id')]}%`;
        type_writer($(this), `${$(this).text()} ${value}`, 1000);
        init_s_value($(this), value , 2);
    }, function()
    {
        reset_s($(this).parent().attr("class").split(' ')[1], $(this), 2);
        $(this).text($(this).text().split(' ')[0])

    });


    const hobbies = {
        movies: "Cinéma",
        read: "Lire",
        travel: "Voyager",
        games: "Jeux Vidéos"
    }

    $(".h-icon").hover(function()
    {
        $(this).parent().parent().find("#hobbies-text").text(hobbies[$(this).attr('id')]);
        $(this).toggleClass("active");

    }, function()
    {
        $(this).parent().parent().find("#hobbies-text").text("");
        $(this).toggleClass("active");

    });


    $(".burger-menu").click(function() {
        $(this).toggleClass("b-active");
        
        $(".presentation").toggleClass("pres-show");

        let a_header = $(".aside-header");
        let a_content = $(".aside-content");
        a_header.toggleClass("aside-h-show");
        if (document.querySelector(".aside-header").classList.contains("anim-show"))
        {
            a_header.toggleClass("anim-show")
        }
        a_content.toggleClass("aside-c-show");
        if (document.querySelector(".aside-content").classList.contains("anim-show"))
        {
            a_content.toggleClass("anim-show")
        }
    });

});

