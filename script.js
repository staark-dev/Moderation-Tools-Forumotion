/**
 * Title         : Forumotion tools for moderation
 * Version       : 1.0.3
 * Author        : Zeus and update by Staark
 * Author URI    : http://help.forumgratuit.ro
 * License       : GNU - General Public License v3.0
 * Documentation : https://github.com/zeusmaximus/Moderation-tools-for-Forumotion/
 */


const zModConfig = [{
    icon: "https://i.servimg.com/u/f58/11/80/17/98/chat-110.png",
    loadCss: true, // true or false
    css_source: "https://cdn.rawgit.com/zeusmaximus/Moderation-tools-for-Forumotion/e46f560/style.css",
    fontAwesome: true // true or false
}];

const zModTabels = [{
        type: "zalert",
        body_start: '[table class="zmod_box zalert"][tr][td style="padding-right: 10px;" width="60px;"][icon="fa fa-exclamation-circle"][/icon][div]',
        body_end: "[/div][/td][/tr][/table]\n\n"
    }, {
        type: "zsuccess",
        body_start: '[table class="zmod_box zsuccess"][tr][td style="padding-right: 10px;" width="60px;"][icon="fa fa-check"][/icon][div]',
        body_end: "[/div][/td][/tr][/table]\n\n"
    }, {
        type: "zdefault",
        body_start: '[table class="zmod_box zdefault"][tr][td style="padding-right: 10px;" width="60px;"][icon="fa fa-rocket"][/icon][div]',
        body_end: "[/div][/td][/tr][/table]\n\n"
    }, {
        type: "zwarning",
        body_start: '[table class="zmod_box zwarning"][tr][td style="padding-right: 10px;" width="60px;"][icon="fa fa-exclamation-triangle"][/icon][div]',
        body_end: "[/div][/td][/tr][/table]\n\n"
    }, {
        type: "zinfo",
        body_start: '[table class="zmod_box zinfo"][tr][td style="padding-right: 10px;" width="60px;"][icon="fa fa-info"][/icon][div]',
        body_end: "[/div][/td][/tr][/table]\n\n"
    }
];

const zModMessages = [{
        name: "Alert example",
        message: '[b]Alert[/b] \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        group_id: 0,
        type: "zalert"
    }, {
        name: "Success example",
        message: '[b]Success[/b] \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        group_id: 0,
        type: "zsuccess"
    }, {
        name: "Default example",
        message: '[b]Default[/b] \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        group_id: 1,
        type: "zdefault"
    }, {
        name: "Warning example",
        message: '[b]Warning[/b] \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        group_id: 1,
        type: "zwarning"
    }, {
        name: "Info example",
        message: '[b]Info[/b] \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        group_id: 1,
        type: "zinfo"
    }
];

const zModGroups = [{
        id: 0,
        name: 'Administrators'
    }, {
        id: 1,
        name: 'Moderators'
    }
];

function initZModTools(config? = zModConfig, messages? = zModMessages) {
    const list = "";

    $('.zmod_box td').each(function() {
        this.innerHTML = this.innerHTML.replace(/\[icon\="?(.*?)"?\](.*?)\[\/icon\]/g, "<div><i class=\"$1\ icon-message\">$2</i></div>")
            .replace(/\[div\](.*?)\[\/div\]/g, "<div>$1</div>");
    });

    window.addEventListener("load", () => {
        if (zModConfig[0].loadCss === true)
            $('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />').append('head');
        
        if (zModConfig[0].loadCss === true)
            $('<link rel="stylesheet" type="text/css" href="'+ zModConfig[0].css_source +'" />').append('head');
        
        $('<style type="text/css">.sceditor-button-staff div {background: url(' + zModConfig[0].icon + ') !important;}</style>').append('head');
        // Nothig for the moment
    });

    /**
     * SCeditor Button for Mod Tools
     * @params null
     * @return button
     */
    if (!$.sceditor) return;

    $.sceditor.command.set('staff', {
        createDropdown: function(editor, callback) {
            var c = $('<ul class="mod_groups" id="mod_box_i" />'), i;
            
            for (i = 0; i < zModMessages.length; i++) {
                $(`<li class='mod_editor_message group_${messages[i].group_id}' id='group_${i}_${messages[i].group_id}'>
                        <a style='cursor: pointer'>${messages[i].name}</a>
                    </li>\n`)
                .data('staff-list', zModTabels[i].body_start + zModMessages[i].message + zModTabels[i].body_end)
                .click(function(e) {
                    callback($(this).data('staff-list'));
                    editor.closeDropDown(true);

                    e.preventDefault();
                }).appendTo(c);
            }

            return c;
        },
        exec: function(c) {
            var e = this;
            this.createDropDown(c, 'staff', $.sceditor.command.get('staff').createDropdown(e, function(I) {
                e.insert(I);
            }));
        },
        txtExec: function(c) {
            var e = this;
            this.createDropDown(c, 'staff', $.sceditor.command.get('staff').createDropdown(e, function(I) {
                e.insert(I);
            }));
        },
        tooltip: "Staff Moderations Tools"
    });
    
    toolbar = toolbar.replace(/strike/, 'strike,staff');
    console.log("The script initialize succesfully @latest");
}

$(function() {
    initZModTools();
});
