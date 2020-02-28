import Util from '@foragefox/page-builder-util';

/**
 *  Jquery to replace
 *   - $.extend
 *   - $
 *   - appendTo
 *   - append
 *   - find
 *   - $.Event
 *   - trigger
 */
class Toaster {

    constructor(options) {
        this.options = $.extend(true, {}, Toaster.DEFAULTS, typeof options == 'object' && options);

        this.$body = $('body');
    }

    run() {
        this.container = $(this.options.templates.container).appendTo(this.$body);
        this.wrapper = $(this.options.templates.wrapper).appendTo(this.container);

        this.container.on('add.toaster', this.eventTrigger.bind(this));
    }

    eventTrigger(event) {
        this.addToast(event.toast);
    }

    addToast(options) {
        var options = $.extend(true, {}, this.options.toastOptions, typeof options == 'object' && options);

        if (options.title != '' && options.content != '') {

            options.autohide = options.autohide ? 'true' : 'false';

            this.wrapper.append(Util.supplant(this.options.templates.toast, options));
            this.wrapper.find('.toast:last').toast('show');
        }
    }

    static trigger(options) {
        const e = $.Event('add.toaster', { toast: options });
        $('.toaster').trigger(e);
    }
}

Toaster.DEFAULTS = {
    toastOptions: {
        type: 'info',
        image: undefined,
        icon: '',
        title: '',
        subtitle: '',
        content: '',
        autohide: true,
        delay: 4500
    },
    templates: {
        container: `<div class="toaster" aria-live="polite" aria-atomic="true"></div>`,
        wrapper: `<div class="toaster-slots"></div>`,
        toast: `
			<div class="toast toast-{{type}}" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="{{autohide}}" data-delay="{{delay}}">
				
				<div class="toast-header">
		        	{{if (typeof image !== 'undefined')}}
		            	<img src="{{image.src}}" class="{{image.class}} mr-2" alt="{{image.alt}}">;
		        	{{elseif (icon !== '')}}
		        		<i class="glyph glyph-{{icon}}"></i>
		        	{{/if}}
	
		        	<strong class="mr-auto">{{title}}</strong>
		        	
		        	{{if (subtitle !== '')}}
		        		<small>{{subtitle}}</small>
		        	{{/if}}
		        	
		        	<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
		        		<i class="glyph glyph-close"></i>
		        	</button>
	        	</div>

	            <div class="toast-body">
	            	{{content}}
	            </div>
	  
	        </div>
		`,

    }
}

export default Toaster;