$(function () {
    LengthTester.init();
});
var LengthTester = {
    lengths: ['Random', 'Empty', 'One word', 'Very short', 'Short', 'Medium', 'Long', 'Very long'],
    selectors: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'p', 'blockquote'],
    text_source: 'lorem ipsum dolor sit amet, consectetur adipiscing elit cras sollicitudin congue elit vitae iaculis integer nisl eros, luctus vel vulputate vel venenatis vel dolor vestibulum auctor lacus eget libero rhoncus non tristique diam elementum cras convallis justo vel lacus lacinia molestie aenean ligula magna lacinia eu ornare ac venenatis nec mauris proin consectetur ante ac ullamcorper pellentesque elit elit sollicitudin ligula et vehicula nulla sapien tincidunt dolor mauris vel justo velit cras in mauris nibh proin aliquet mi vitae ipsum malesuada sodales congue risus tempor aenean eu fringilla sapien aenean sit amet ipsum lacus et varius nibh vivamus quis libero sapien donec sollicitudin elit eget libero scelerisque interdum'.split(' '),
    init: function () {
        this.add_css();
        this.add_html();
        this.add_listeners();
    },
    add_css: function () {
        var css = '<style type="text/css">' +
            'body { padding-top: 24px; }' +
            '.lengthtester { background: #333; color: #fff; position: fixed; top: 0; left: 0; right: 0; z-index: 9999999; }' +
            '.lengthtester-settingsform { display: none; padding: 0.6em; }' +
            'a.lengthtester-button { display: block; text-align: center; height: 24px; }' +
            'a.lengthtester-button:hover, a.lengthtester-button:active { background: #555; color: #fff }' +
            'a.lengthtester-button:link, a.lengthtester-button:visited { color: #fff }' +
            '.lengthtester-elementselector { float: left; width: 180px; }' +
            '.lengthtester-globalsettings { clear: both; }' +
            '.lengthtester-lengthselector, .lengthtester-selector { margin-left: 1em; }' +
            '.lengthtester-selector { margin-right: 4em; }' +
            '.lengthtester-settingsform h3 span { font-size: 0.6em; font-style: italic; }' +
            '.lengthtester-settingsform p { margin: 0; padding: 0.6em 0; }' +
            '<style>';
        jQuery('head').append(css);
    },
    add_html: function () {
        var html = '<div class="lengthtester">' +
            '<div class="lengthtester-settingsform">' +
            '<h3>LengthTester <span>Choose the settings below and click Apply</span></h3>' +
            this.add_element_selectors() +
            '<p class="lengthtester-globalsettings">' +
            '<label>Selector <input type="text" name="lengthtester-selector" class="lengthtester-selector" /></label>' +
            '<label>Set all lengths' +
            this.length_options('all') +
            '</label></p>' +
            '<p><button type="button" class="lengthtester-applybutton">Apply</button> <button type="button" class="lengthtester-resetbutton">Reset</button></p>' +
            '</div>' +
            '<a class="lengthtester-button" href="#">LengthTester settings</a>' +
            '</div>';
        jQuery('body').append(html);
    },
    add_element_selectors: function () {
        var html = '';
        jQuery.each(this.selectors, function (index, value) {
            html += '<p class="lengthtester-elementselector"><label> ' + value.toUpperCase() +
                LengthTester.length_options(value) +
                '</label></p>';
        });
        return html;
    },
    length_options: function (prefix) {
        var options = '<select id="lengthtester-' + prefix + '" class="lengthtester-lengthselector">' +
            '<option value="original">Original value</option>';
        jQuery.each(this.lengths, function (index, value) {
            options += '<option value="' + value.replace(' ', '').toLowerCase() + '">' + value + '</option>';
        });
        options += '</select>';
        return options;
    },
    add_listeners: function () {
        jQuery('.lengthtester-button').on('click', function () {
            jQuery('.lengthtester-settingsform').toggle('fast');
            return false;
        });
        jQuery('.lengthtester-applybutton').on('click', function () {
            LengthTester.apply();
        });
        jQuery('.lengthtester-resetbutton').on('click', function () {
            LengthTester.reset_all();
        });
        jQuery('#lengthtester-all').on('change', function () {
            LengthTester.set_all_lengths();
        });
    },
    get_text: function (length) {
        var random_length = 1;
        switch (length) {
            case 'empty':
                return '';
                break;
            case 'random':
                random_length = Math.floor((Math.random() * 25) + 1);
                break;
            case 'veryshort':
                random_length = 3;
                break;
            case 'short':
                random_length = 5;
                break;
            case 'medium':
                random_length = 10;
                break;
            case 'long':
                random_length = 15;
                break;
            case 'verylong':
                random_length = 25;
                break;
            default:
                random_length = 1;
                break;
        }
        var start = Math.floor((Math.random() * this.text_source.length - 26) + 1);
        return this.text_source.slice(start, start + random_length).join().replace(/,/gi, ' ');
    },
    set_all_lengths: function () {
        var length = jQuery('#lengthtester-all').val();
        jQuery('.lengthtester-lengthselector').each(function () {
            var selector = $(this);
            selector.val(length);
        });
    },
    apply: function () {
        jQuery.each(this.selectors, function (index, value) {
            jQuery(value, jQuery('.lengthtester-selector').val()).each(function () {
                var el = jQuery(this),
                    length = jQuery('#lengthtester-' + value).val();
                if (!el.parents('.lengthtester').length) {
                    if (length == 'original') {
                        LengthTester.reset_el(el);
                    } else {
                        LengthTester.set_original_data(el);
                        el.html(LengthTester.get_text(length));
                    }
                }
            });
        });
    },
    set_original_data: function (el) {
        if (typeof el.data('originalvalue') == 'undefined' || !el.data('originalvalue').length) el.data('originalvalue', el.html());
    },
    reset_el: function (el) {
        if (typeof el.data('originalvalue') != 'undefined' && el.data('originalvalue').length) {
            el.html(el.data('originalvalue'));
            el.data('originalvalue', '');
        }
    },
    reset_all: function () {
        jQuery.each(this.selectors, function (index, value) {
            jQuery(value).each(function () {
                var el = jQuery(this);
                LengthTester.reset_el(el);
            });
        });
    }
}