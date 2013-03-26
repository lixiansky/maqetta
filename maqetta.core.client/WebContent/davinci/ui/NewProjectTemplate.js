define(["dojo/_base/declare",
        "dijit/_Templated",
        "dijit/_Widget",
        "davinci/library",
        "system/resource",
        "davinci/workbench/Preferences",
        "davinci/Runtime",
        "davinci/Workbench",
        "dojo/i18n!davinci/ui/nls/ui",
        "dojo/i18n!dijit/nls/common",
        "dojo/text!./templates/NewProjectTemplate.html",
        "dijit/form/Button",
        "dijit/form/RadioButton",
        "dijit/form/ValidationTextBox"
        
],function(declare, _Templated, _Widget,  Library, Resource, Preferences,  Runtime, Workbench, uiNLS, commonNLS, templateString){

	var noProjectTemplate = '_none_';

	return dojo.declare("davinci.ui.NewProjectTemplate",   [_Widget,_Templated], {
		widgetsInTemplate: true,
		templateString: templateString,
		_okButton: null,
		_projectTemplateName: null,
		
		postMixInProperties: function() {
			var langObj = uiNLS;
			var dijitLangObj = commonNLS;
			dojo.mixin(this, langObj);
			dojo.mixin(this, dijitLangObj);
			this.inherited(arguments);
		},

		postCreate: function(){
			this.inherited(arguments);
			dojo.connect(this._projectTemplateName, "onKeyUp", this, '_checkValid');

			//FIXME: Why not just use a regex?
			this._projectTemplateName.validator = dojo.hitch(this, function(value, constraints) {
					var isValid = true;
					if (!value) {
						isValid = false;
					} else {
						this._projectTemplateName.invalidMessage = null;
					}
					return isValid;
			});
		},
		
		_checkValid: function(){
			var valid = this._projectTemplateName.isValid();
			this._okButton.set('disabled', !valid);
		},
		
		okButton: function() {
			var NewProjectTemplateName = this._projectTemplateName.get("value");
	    	require(['davinci/ui/ProjectTemplates'], function(ProjectTemplates){
	    		ProjectTemplates.create(NewProjectTemplateName);
	    	});
		},
		
		_getValueAttr: function(){
			return this.value;
		},

		cancelButton: function(){
			this.cancel = true;
			this.onClose();
		},

		onClose: function(){}
	});
});
