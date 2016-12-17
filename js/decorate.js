var editor;
KISSY.use("editor", function (S, Editor) {
		var cfg ={
				// 是否初始聚焦
				fromTextarea:'#module-editor',
				focused: true,
				attachForm: true,
				baseZIndex: 10000,
				width: '100%',
				height: "300"
					// 自定义样式
					// customStyle:"p{line-height: 1.4;margin: 1.12em 0;padding: 0;}",
					// 自定义外部样式
					// customLink:["http://localhost/customLink.css","http://xx.com/y2.css"],
					
		};
		
		var plugins = ("source-area" +
				",separator" +
				",bold" +
				",italic," +
				"font-family," +
				"font-size," +
				"strike-through," +
				"checkbox-source-area" +
				/*"underline," +
				"separator," +
				",image" +
				",link" +
				",fore-color" +
				",back-color" +
				",draft" +
				",undo" +
				",indent" +
				",outdent" +
				",unordered-list" +
				",ordered-list" +
				",element-path" +
				",preview" +
				",maximize" +
				",remove-format" +
				",heading" +
				",justify-left" +
				",justify-center" +
				",justify-right" +
				",table" +*/
				",smiley").split(",");
		
		var fullPlugins = [];
		
		S.each(plugins, function (p, i) {
			fullPlugins[i] = "editor/plugin/" + p;
		});
		
		var pluginConfig = {
				link: {
					target: "_blank"
				},
				"image": {
					defaultMargin: 0,
					remote:true
				},
				"flash": {
					"defaultWidth": "300",
					"defaultHeight": "300"
				},
				"templates": [
				              {
				            	  demo: "模板1效果演示html",
				            	  html: "<div style='border:1px solid red'>模板1效果演示html</div><p></p>"
				              },
				              {
				            	  demo: "模板2效果演示html",
				            	  html: "<div style='border:1px solid red'>模板2效果演示html</div>"
				              }
				              ],
				              "font-size": {
				            	  matchElWidth: false,
				            	  menu: {
				            		  children: [
				            		             {
				            		            	 value: "14px",
				            		            	 textContent: "标准",
				            		            	 elAttrs: {
				            		            		 style: 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
				            		            	 },
				            		            	 content: " <span style='font-size:14px'>标准</span>" +
				            		            	 "<span style='position:absolute;top:1px;right:3px;'>14px</span>"
				            		             },
				            		             {
				            		            	 value: "16px",
				            		            	 textContent: "大",
				            		            	 elAttrs: {
				            		            		 style: 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
				            		            	 },
				            		            	 content: "" +
				            		            	 " <span style='font-size:16px'>大</span>" +
				            		            	 "<span style='position:absolute;top:1px;right:3px;'>16px</span>"
				            		             },
				            		             {
				            		            	 value: "18px",
				            		            	 textContent: "特大",
				            		            	 elAttrs: {
				            		            		 style: 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
				            		            	 },
				            		            	 content: "" +
				            		            	 " <span style='font-size:18px'>特大</span>" +
				            		            	 "<span style='position:absolute;top:1px;right:3px;'>18px</span>"
				            		             },
				            		             {
				            		            	 value: "20px",
				            		            	 textContent: "极大",
				            		            	 elAttrs: {
				            		            		 style: 'position: relative; border: 1px solid #DDDDDD; margin: 2px; padding: 2px;'
				            		            	 },
				            		            	 content: "" +
				            		            	 " <span style='font-size:20px'>极大</span>" +
				            		            	 "<span style='position:absolute;top:1px;right:3px;'>20px</span>"
				            		             }
				            		             ],
				            		             width: "125px"
				            	  }
				              },
				              "draft": {
				            	  // 当前编辑器的历史是否要单独保存到一个键值而不是公用
				            	  // saveKey:"xxx",
				            	  interval: 5,
				            	  limit: 10,
				            	  "helpHtml": "<div " +
				            	  "style='width:200px;'>" +
				            	  "<div style='padding:5px;'>草稿箱能够自动保存您最新编辑的内容，" +
				            	  "如果发现内容丢失，" +
				            	  "请选择恢复编辑历史</div></div>"
				              },
				              "drag-upload": {
				            	  suffix: "png,jpg,jpeg,gif",
				            	  fileInput: "Filedata",
				            	  sizeLimit: 1000,
				            	  serverUrl: "/upload.action",
				            	  serverParams: {
				            		  waterMark: function () {
				            			  return true;
				            		  }
				            	  }
				              }
		};
		
		KISSY.use(fullPlugins, function (S) {
			var args = S.makeArray(arguments);
			
			args.shift();
			
			S.each(args, function (arg, i) {
				var argStr = plugins[i], cfg;
				if (cfg = pluginConfig[argStr]) {
					args[i] = new arg(cfg);
				}
			});
			
			cfg.plugins = args;
			if (cfg.fromTextarea) {
				editor = Editor.decorate(cfg.fromTextarea, cfg);
			} else {
				editor = new Editor(cfg);
				editor.render();
			}
			editor.on("blur", function(){
				$('.ks-editor-bubble').addClass('ks-editor-overlay-hidden');
			});
			editor.docReady(function(){
				if (!editor.getData()){
					try{loadEditorData();}catch(e){;}
					try{initEditor();}catch(e){;}
				}
				
			})
		});

});