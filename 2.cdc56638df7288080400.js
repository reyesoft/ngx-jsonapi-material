(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{BVmJ:function(l,n,u){"use strict";u.r(n);var a=u("CcnG"),t=function(){},e=u("pMnS"),o=u("t68o"),r=u("zbXB"),i=u("NcP4"),c=u("bujt"),b=u("UodH"),s=u("dWZg"),h=u("lLAP"),d=u("wFw1"),m=u("ZYCi"),p=u("Ip0R"),f=u("cPDC"),g=u("I6r4"),y=u("7HSq"),j=u("xtqI"),k=u("Hkcf"),w=function(){function l(l,n,u){var a=this;this.router=l,this.route=n,this.authorsService=u,n.queryParams.subscribe(function(l){var n=l.page;u.all({sort:["name"],page:{number:n||1},ttl:3600}).subscribe(function(l){a.authors=l,console.info("success authors controller",l,"page",n||1,l.page.number)},function(l){return console.error("Could not load authors :(",l)})})}return l.prototype.goTo=function(l){console.log("page?",l.pageIndex),this.router.navigate(["."],{queryParams:{page:l.pageIndex},relativeTo:this.route})},l}(),v=a.Xa({encapsulation:2,styles:[],data:{}});function Z(l){return a.tb(0,[(l()(),a.Za(0,0,null,null,14,"tr",[],null,null,null,null,null)),(l()(),a.Za(1,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),a.rb(2,null,["",""])),(l()(),a.Za(3,0,null,null,5,"td",[],null,null,null,null,null)),(l()(),a.Za(4,0,null,null,4,"a",[["color","primary"],["mat-button",""]],[[1,"tabindex",0],[1,"disabled",0],[1,"aria-disabled",0],[2,"_mat-animation-noopable",null],[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==a.jb(l,5)._haltDisabledEvents(u)&&t),"click"===n&&(t=!1!==a.jb(l,6).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t},c.c,c.a)),a.Ya(5,180224,null,0,b.a,[s.a,h.h,a.l,[2,d.a]],{color:[0,"color"]},null),a.Ya(6,671744,null,0,m.n,[m.l,m.a,p.j],{routerLink:[0,"routerLink"]},null),a.kb(7,2),(l()(),a.rb(8,0,["",""])),(l()(),a.Za(9,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),a.rb(10,null,["",""])),a.nb(11,1),(l()(),a.Za(12,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),a.rb(13,null,["",""])),a.nb(14,1)],function(l,n){l(n,5,0,"primary"),l(n,6,0,l(n,7,0,"/authors",n.context.$implicit.id))},function(l,n){l(n,2,0,n.context.$implicit.id),l(n,4,0,a.jb(n,5).disabled?-1:a.jb(n,5).tabIndex||0,a.jb(n,5).disabled||null,a.jb(n,5).disabled.toString(),"NoopAnimations"===a.jb(n,5)._animationMode,a.jb(n,6).target,a.jb(n,6).href),l(n,8,0,n.context.$implicit.attributes.name),l(n,10,0,a.sb(n,10,0,l(n,11,0,a.jb(n.parent,0),n.context.$implicit.attributes.date_of_birth))),l(n,13,0,a.sb(n,13,0,l(n,14,0,a.jb(n.parent,0),n.context.$implicit.attributes.date_of_death)))})}function Y(l){return a.tb(0,[a.lb(0,p.e,[a.y]),(l()(),a.Za(1,0,null,null,1,"h3",[],null,null,null,null,null)),(l()(),a.rb(-1,null,["Authors"])),(l()(),a.Za(3,0,null,null,1,"demo-collection-info",[],null,null,null,f.b,f.a)),a.Ya(4,49152,null,0,g.a,[],{collection:[0,"collection"]},null),(l()(),a.Za(5,0,null,null,16,"div",[["class","mat-elevation-z2"]],null,null,null,null,null)),(l()(),a.Za(6,0,null,null,13,"table",[],null,null,null,null,null)),(l()(),a.Za(7,0,null,null,9,"thead",[],null,null,null,null,null)),(l()(),a.Za(8,0,null,null,8,"tr",[],null,null,null,null,null)),(l()(),a.Za(9,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a.rb(-1,null,["ID"])),(l()(),a.Za(11,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a.rb(-1,null,["Name"])),(l()(),a.Za(13,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a.rb(-1,null,["Date of birth"])),(l()(),a.Za(15,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a.rb(-1,null,["Date of dead"])),(l()(),a.Za(17,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),a.Qa(16777216,null,null,1,null,Z)),a.Ya(19,278528,null,0,p.l,[a.W,a.S,a.w],{ngForOf:[0,"ngForOf"],ngForTrackBy:[1,"ngForTrackBy"]},null),(l()(),a.Za(20,0,null,null,1,"demo-collection-paginator",[],null,null,null,y.b,y.a)),a.Ya(21,49152,null,0,j.a,[],{collection:[0,"collection"]},null)],function(l,n){var u=n.component;l(n,4,0,u.authors),l(n,19,0,u.authors.data,u.authors.trackBy),l(n,21,0,u.authors)},null)}var x=a.Va("demo-authors",w,function(l){return a.tb(0,[(l()(),a.Za(0,0,null,null,1,"demo-authors",[],null,null,null,Y,v)),a.Ya(1,49152,null,0,w,[m.l,m.a,k.a],null,null)],null,null)},{},{},[]),A=u("FVSy"),D=u("lzlj"),S=u("21Lb"),_=u("OzfB"),L=u("Fzqc"),F=u("/xbi"),I=u("v1ij"),K=u("v9Dh"),O=u("eDkP"),C=u("qAlS"),B=u("ZYjt"),q=u("Mr+X"),M=u("SMsm"),T=u("BgWK"),W=u("gIcY"),z=[new I.Pa("name").setTemplateOption("placeholder","Nombre").fxFlex(100).setFocus().required().set("validation",{messages:{required:"El nombre del autor es obligatorio"}})],N=function(){function l(l,n,u){this.data=l,this.matDialogRef=n,this.authorsService=u,this.form=new W.j({}),this.model={},this.author=l||u.new(),this.title="Add new author",this.fields=z}return l.prototype.accept=function(){var l=this;for(var n in this.model)this.author[n]=this.model[n];this.author.save().subscribe(function(){return l.matDialogRef.close(!0)})},l.prototype.cancel=function(){this.matDialogRef.close()},l}(),P=u("wKmF"),$=u("uI04"),V=(new I.Ba).addSections([new I.Ia("Edit and add").addButtons([new I.b("newAuthor").addAttributes({label:"New author",icon:"person_add"})]),new I.Ia("Others").addButtons([new I.b("removeRelationship").addAttributes({label:"Remove relationship",icon:"delete"})])]),E=function(){function l(l,n,u,a,t){var e=this;this.booksService=l,this.authorsService=n,this.photosService=u,this.matDialog=a,this.route=t,this.page={number:1,size:20},this.menu_options=V,t.params.subscribe(function(l){n.get(l.id,{include:["books","photos"],ttl:100}).subscribe(function(l){e.author=l},function(l){return console.error("Could not load author.",l)})})}return l.prototype.newAuthor=function(){var l=this.authorsService.new();this.matDialog.open(N).afterClosed().subscribe(function(n){n&&console.log("author saved",l.toObject())})},l.prototype.updateAuthor=function(){var l=this;this.author.attributes.name=prompt("Author name:",this.author.attributes.name),console.log("author data for save with book include",this.author.toObject({include:["books"]})),console.log("author data for save without any include",this.author.toObject()),this.author.save().subscribe(function(n){console.log("author saved",l.author.toObject())})},l.prototype.removeRelationship=function(){this.author.removeRelationship("photos","1"),this.author.save(),console.log("removeRelationship save with photos include",this.author.toObject())},l.prototype.selectedOption=function(l){this[l.key]()},l}(),R=u("o3x0"),H=a.Xa({encapsulation:2,styles:[],data:{}});function Q(l){return a.tb(0,[(l()(),a.Za(0,0,null,null,1,"img",[["class","mat-card-md-image"],["height","150"],["mat-card-md-image",""]],[[8,"src",4],[8,"title",0]],null,null,null,null)),a.Ya(1,16384,null,0,A.e,[],null,null)],null,function(l,n){l(n,0,0,n.context.$implicit.attributes.uri,a.bb(1,"Book id #",n.context.$implicit.id,""))})}function X(l){return a.tb(0,[(l()(),a.Za(0,0,null,null,11,"tr",[["style","padding: 16px"]],null,null,null,null,null)),(l()(),a.Za(1,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),a.rb(2,null,["",""])),(l()(),a.Za(3,0,null,null,5,"td",[],null,null,null,null,null)),(l()(),a.Za(4,0,null,null,4,"a",[["color","primary"],["mat-button",""]],[[1,"tabindex",0],[1,"disabled",0],[1,"aria-disabled",0],[2,"_mat-animation-noopable",null],[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==a.jb(l,5)._haltDisabledEvents(u)&&t),"click"===n&&(t=!1!==a.jb(l,6).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t},c.c,c.a)),a.Ya(5,180224,null,0,b.a,[s.a,h.h,a.l,[2,d.a]],{color:[0,"color"]},null),a.Ya(6,671744,null,0,m.n,[m.l,m.a,p.j],{routerLink:[0,"routerLink"]},null),a.kb(7,2),(l()(),a.rb(8,0,["",""])),(l()(),a.Za(9,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),a.rb(10,null,["",""])),a.nb(11,1)],function(l,n){l(n,5,0,"primary"),l(n,6,0,l(n,7,0,"/books",n.context.$implicit.id))},function(l,n){l(n,2,0,n.context.$implicit.id),l(n,4,0,a.jb(n,5).disabled?-1:a.jb(n,5).tabIndex||0,a.jb(n,5).disabled||null,a.jb(n,5).disabled.toString(),"NoopAnimations"===a.jb(n,5)._animationMode,a.jb(n,6).target,a.jb(n,6).href),l(n,8,0,n.context.$implicit.attributes.title),l(n,10,0,a.sb(n,10,0,l(n,11,0,a.jb(n.parent.parent,0),n.context.$implicit.attributes.date_published)))})}function J(l){return a.tb(0,[(l()(),a.Za(0,0,null,null,11,"table",[["class","mat-elevation-z2"]],null,null,null,null,null)),(l()(),a.Za(1,0,null,null,7,"thead",[],null,null,null,null,null)),(l()(),a.Za(2,0,null,null,6,"tr",[["style","padding: 16px"]],null,null,null,null,null)),(l()(),a.Za(3,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a.rb(-1,null,["ID"])),(l()(),a.Za(5,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a.rb(-1,null,["Title"])),(l()(),a.Za(7,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),a.rb(-1,null,["Date Published"])),(l()(),a.Za(9,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),a.Qa(16777216,null,null,1,null,X)),a.Ya(11,278528,null,0,p.l,[a.W,a.S,a.w],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,11,0,n.component.author.relationships.books.data)},null)}function U(l){return a.tb(0,[a.lb(0,p.e,[a.y]),(l()(),a.Za(1,0,null,null,48,"mat-card",[["class","mat-card"],["style","width: 350px"]],null,null,null,D.d,D.a)),a.Ya(2,49152,null,0,A.a,[],null,null),(l()(),a.Za(3,0,null,0,8,"mat-card-header",[["class","mat-card-header"]],null,null,null,D.c,D.b)),a.Ya(4,49152,null,0,A.d,[],null,null),(l()(),a.Za(5,0,null,1,2,"mat-card-title",[["class","mat-card-title"]],null,null,null,null,null)),a.Ya(6,16384,null,0,A.h,[],null,null),(l()(),a.rb(7,null,["Author #",", with books and photos"])),(l()(),a.Za(8,0,null,1,3,"mat-card-subtitle",[["class","mat-card-subtitle"]],null,null,null,null,null)),a.Ya(9,16384,null,0,A.g,[],null,null),(l()(),a.Za(10,0,null,null,1,"strong",[],null,null,null,null,null)),(l()(),a.rb(11,null,["",""])),(l()(),a.Qa(16777216,null,0,1,null,Q)),a.Ya(13,278528,null,0,p.l,[a.W,a.S,a.w],{ngForOf:[0,"ngForOf"]},null),(l()(),a.Za(14,0,null,0,16,"mat-card-content",[["class","mat-card-content"],["fxLayout","row wrap"],["fxLayoutGap","16px"]],null,null,null,null,null)),a.Ya(15,737280,null,0,S.d,[_.h,a.l,_.l],{layout:[0,"layout"]},null),a.Ya(16,1785856,null,0,S.e,[_.h,a.l,[6,S.d],a.D,L.b,_.l],{gap:[0,"gap"]},null),a.Ya(17,16384,null,0,A.c,[],null,null),(l()(),a.Za(18,0,null,null,2,"jam-chips-autocomplete",[["appearance","outline"],["matLabel","Search and add a book"],["placeholder","A Game of Thrones, A Clash of Kings, A Storm of Swords, A Feast for Crows, A Dance with Dragons"],["relationAlias","books"],["style","width: 100%"]],null,null,null,F.q,F.c)),a.Ya(19,114688,null,0,I.c,[],{placeholder:[0,"placeholder"],resource:[1,"resource"],service:[2,"service"],relationAlias:[3,"relationAlias"],attributesDisplay:[4,"attributesDisplay"],appearance:[5,"appearance"],matLabel:[6,"matLabel"],page:[7,"page"]},null),a.kb(20,3),(l()(),a.Za(21,0,null,null,4,"div",[],null,null,null,null,null)),(l()(),a.rb(-1,null,["Date of birth: "])),(l()(),a.Za(23,0,null,null,2,"strong",[],null,null,null,null,null)),(l()(),a.rb(24,null,["",""])),a.nb(25,1),(l()(),a.Za(26,0,null,null,4,"div",[],null,null,null,null,null)),(l()(),a.rb(-1,null,["Date of dead: "])),(l()(),a.Za(28,0,null,null,2,"strong",[],null,null,null,null,null)),(l()(),a.rb(29,null,["",""])),a.nb(30,1),(l()(),a.Za(31,0,null,0,18,"mat-card-actions",[["class","mat-card-actions"],["fxLayout","row"],["fxLayoutAlign","space-between center"]],[[2,"mat-card-actions-align-end",null]],null,null,null,null)),a.Ya(32,737280,null,0,S.d,[_.h,a.l,_.l],{layout:[0,"layout"]},null),a.Ya(33,737280,null,0,S.c,[_.h,a.l,[6,S.d],_.l],{align:[0,"align"]},null),a.Ya(34,16384,null,0,A.b,[],null,null),(l()(),a.Za(35,0,null,null,3,"a",[["color","accent"],["mat-button",""],["routerLink","/authors"]],[[1,"tabindex",0],[1,"disabled",0],[1,"aria-disabled",0],[2,"_mat-animation-noopable",null],[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==a.jb(l,36)._haltDisabledEvents(u)&&t),"click"===n&&(t=!1!==a.jb(l,37).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t},c.c,c.a)),a.Ya(36,180224,null,0,b.a,[s.a,h.h,a.l,[2,d.a]],{color:[0,"color"]},null),a.Ya(37,671744,null,0,m.n,[m.l,m.a,p.j],{routerLink:[0,"routerLink"]},null),(l()(),a.rb(-1,0,["Volver"])),(l()(),a.Za(39,0,null,null,10,"div",[["fxLayout","row"],["fxLayoutAlign","start center"]],null,null,null,null,null)),a.Ya(40,737280,null,0,S.d,[_.h,a.l,_.l],{layout:[0,"layout"]},null),a.Ya(41,737280,null,0,S.c,[_.h,a.l,[6,S.d],_.l],{align:[0,"align"]},null),(l()(),a.Za(42,16777216,null,null,5,"button",[["mat-icon-button",""],["matTooltip","Update author"]],[[8,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"],[null,"longpress"],[null,"keydown"],[null,"touchend"]],function(l,n,u){var t=!0,e=l.component;return"longpress"===n&&(t=!1!==a.jb(l,43).show()&&t),"keydown"===n&&(t=!1!==a.jb(l,43)._handleKeydown(u)&&t),"touchend"===n&&(t=!1!==a.jb(l,43)._handleTouchend()&&t),"click"===n&&(t=!1!==e.updateAuthor()&&t),t},c.d,c.b)),a.Ya(43,147456,null,0,K.d,[O.c,a.l,C.a,a.W,a.D,s.a,h.c,h.h,K.b,[2,L.b],[2,K.a],[2,B.g]],{message:[0,"message"]},null),a.Ya(44,180224,null,0,b.b,[a.l,s.a,h.h,[2,d.a]],null,null),(l()(),a.Za(45,0,null,0,2,"mat-icon",[["class","mat-icon notranslate"],["role","img"]],[[2,"mat-icon-inline",null],[2,"mat-icon-no-color",null]],null,null,q.b,q.a)),a.Ya(46,9158656,null,0,M.b,[a.l,M.d,[8,null],[2,M.a]],null,null),(l()(),a.rb(-1,0,["edit"])),(l()(),a.Za(48,0,null,null,1,"jam-menu",[],null,[[null,"selected"]],function(l,n,u){var a=!0;return"selected"===n&&(a=!1!==l.component.selectedOption(u)&&a),a},F.w,F.i)),a.Ya(49,245760,null,0,I.Ca,[T.b],{menu:[0,"menu"]},{selected:"selected"}),(l()(),a.Za(50,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),a.rb(-1,null,["Books"])),(l()(),a.Qa(16777216,null,null,1,null,J)),a.Ya(53,16384,null,0,p.m,[a.W,a.S],{ngIf:[0,"ngIf"]},null),(l()(),a.Za(54,0,null,null,4,"p",[],null,null,null,null,null)),(l()(),a.Za(55,0,null,null,3,"a",[["color","accent"],["mat-button",""],["routerLink","/authors"]],[[1,"tabindex",0],[1,"disabled",0],[1,"aria-disabled",0],[2,"_mat-animation-noopable",null],[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==a.jb(l,56)._haltDisabledEvents(u)&&t),"click"===n&&(t=!1!==a.jb(l,57).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&t),t},c.c,c.a)),a.Ya(56,180224,null,0,b.a,[s.a,h.h,a.l,[2,d.a]],{color:[0,"color"]},null),a.Ya(57,671744,null,0,m.n,[m.l,m.a,p.j],{routerLink:[0,"routerLink"]},null),(l()(),a.rb(-1,0,["Volver"]))],function(l,n){var u=n.component;l(n,13,0,u.author.relationships.photos.data),l(n,15,0,"row wrap"),l(n,16,0,"16px"),l(n,19,0,"A Game of Thrones, A Clash of Kings, A Storm of Swords, A Feast for Crows, A Dance with Dragons",u.author,u.booksService,"books",l(n,20,0,"title","date_published","isbn"),"outline","Search and add a book",u.page),l(n,32,0,"row"),l(n,33,0,"space-between center"),l(n,36,0,"accent"),l(n,37,0,"/authors"),l(n,40,0,"row"),l(n,41,0,"start center"),l(n,43,0,"Update author"),l(n,46,0),l(n,49,0,u.menu_options),l(n,53,0,u.author.relationships.books.builded),l(n,56,0,"accent"),l(n,57,0,"/authors")},function(l,n){var u=n.component;l(n,7,0,u.author.id),l(n,11,0,u.author.attributes.name),l(n,24,0,a.sb(n,24,0,l(n,25,0,a.jb(n,0),u.author.attributes.date_of_birth))),l(n,29,0,a.sb(n,29,0,l(n,30,0,a.jb(n,0),u.author.attributes.date_of_death))),l(n,31,0,"end"===a.jb(n,34).align),l(n,35,0,a.jb(n,36).disabled?-1:a.jb(n,36).tabIndex||0,a.jb(n,36).disabled||null,a.jb(n,36).disabled.toString(),"NoopAnimations"===a.jb(n,36)._animationMode,a.jb(n,37).target,a.jb(n,37).href),l(n,42,0,a.jb(n,44).disabled||null,"NoopAnimations"===a.jb(n,44)._animationMode),l(n,45,0,a.jb(n,46).inline,"primary"!==a.jb(n,46).color&&"accent"!==a.jb(n,46).color&&"warn"!==a.jb(n,46).color),l(n,55,0,a.jb(n,56).disabled?-1:a.jb(n,56).tabIndex||0,a.jb(n,56).disabled||null,a.jb(n,56).disabled.toString(),"NoopAnimations"===a.jb(n,56)._animationMode,a.jb(n,57).target,a.jb(n,57).href)})}var G=a.Va("demo-author",E,function(l){return a.tb(0,[(l()(),a.Za(0,0,null,null,1,"demo-author",[],null,null,null,U,H)),a.Ya(1,49152,null,0,E,[$.a,k.a,P.a,R.e,m.a],null,null)],null,null)},{},{},[]),ll=u("YImT"),nl=u("l7KE"),ul=u("IWKk"),al=u("vaAY"),tl=u("s/Hs"),el=u("0Uq3"),ol=u("zJr5"),rl=u("m2xc"),il=u("yWMr"),cl=u("vZwA"),bl=a.Xa({encapsulation:2,styles:[],data:{}});function sl(l){return a.tb(0,[(l()(),a.Za(0,0,null,null,2,"h1",[["class","mat-dialog-title"],["matDialogTitle",""]],[[8,"id",0]],null,null,null,null)),a.Ya(1,81920,null,0,R.m,[[2,R.l],a.l,R.e],null,null),(l()(),a.rb(2,null,["",""])),(l()(),a.Za(3,0,null,null,2,"jam-formly-form-flex",[["class","width-100"],["fxLayout","row"]],null,null,null,F.t,F.f)),a.Ya(4,737280,null,0,S.d,[_.h,a.l,_.l],{layout:[0,"layout"]},null),a.Ya(5,966656,null,0,I.p,[cl.g,a.k,[2,W.s],[2,W.k],[3,cl.f]],{model:[0,"model"],form:[1,"form"],fields:[2,"fields"]},null),(l()(),a.Za(6,0,null,null,3,"mat-dialog-actions",[["align","end"],["class","mat-dialog-actions"]],null,null,null,null,null)),a.Ya(7,16384,null,0,R.f,[],null,null),(l()(),a.Za(8,0,null,null,1,"jam-submit",[],null,[[null,"cancel"],[null,"accept"]],function(l,n,u){var a=!0,t=l.component;return"cancel"===n&&(a=!1!==t.cancel()&&a),"accept"===n&&(a=!1!==t.accept()&&a),a},F.D,F.p)),a.Ya(9,49152,null,0,I.Oa,[p.i,m.l,m.a],null,{accept:"accept",cancel:"cancel"})],function(l,n){var u=n.component;l(n,1,0),l(n,4,0,"row"),l(n,5,0,u.model,u.form,u.fields)},function(l,n){var u=n.component;l(n,0,0,a.jb(n,1).id),l(n,2,0,u.title)})}var hl=a.Va("demo-create-author.component",N,function(l){return a.tb(0,[(l()(),a.Za(0,0,null,null,1,"demo-create-author",[["class","component"]],null,null,null,sl,bl)),a.Ya(1,49152,null,0,N,[R.a,R.l,k.a],null,null)],null,null)},{},{},[]),dl=u("Wf4p"),ml=u("M2Lx"),pl=u("jQLj"),fl=u("mVsa"),gl=u("uGex"),yl=u("4epT"),jl=u("4tE/"),kl=u("4c35"),wl=u("/VYK"),vl=u("seP3"),Zl=u("b716"),Yl=u("8mMr"),xl=u("de3e"),Al=u("hUWP"),Dl=u("3pJQ"),Sl=u("V9q+"),_l=u("y4qS"),Ll=u("BHnd"),Fl=u("vvyD"),Il=u("PCNd"),Kl=function(){},Ol=u("2wDS"),Cl=u("3H1x"),Bl=u("1MUZ"),ql=u("1cSh"),Ml=u("I6xL"),Tl=u("r7Sy"),Wl=u("L08Y"),zl=u("9It4"),Nl=u("10iu"),Pl=u("xcyh"),$l=u("Blfk"),Vl=u("LC5p"),El=u("0/Q6"),Rl=u("YhbO"),Hl=u("jlZm"),Ql=u("/dO6"),Xl=u("YSh2");u.d(n,"AuthorsModuleNgFactory",function(){return Jl});var Jl=a.Wa(t,[],function(l){return a.gb([a.hb(512,a.k,a.Ja,[[8,[e.a,o.a,r.b,r.a,i.a,x,G,ll.e,ll.f,nl.a,ul.a,al.a,tl.a,el.a,ol.a,rl.a,il.a,F.E,hl]],[3,a.k],a.B]),a.hb(4608,p.o,p.n,[a.y,[2,p.B]]),a.hb(4608,dl.c,dl.z,[[2,dl.h],s.a]),a.hb(4608,O.c,O.c,[O.i,O.e,a.k,O.h,O.f,a.u,a.D,p.d,L.b,[2,p.i]]),a.hb(5120,O.j,O.k,[O.c]),a.hb(5120,R.c,R.d,[O.c]),a.hb(135680,R.e,R.e,[O.c,a.u,[2,p.i],[2,R.b],R.c,[3,R.e],O.e]),a.hb(4608,ml.c,ml.c,[]),a.hb(4608,pl.i,pl.i,[]),a.hb(5120,pl.a,pl.b,[O.c]),a.hb(4608,dl.d,dl.d,[]),a.hb(5120,K.b,K.c,[O.c]),a.hb(4608,B.f,dl.e,[[2,dl.i],[2,dl.n]]),a.hb(5120,fl.b,fl.h,[O.c]),a.hb(4608,_.j,_.i,[_.d,_.g]),a.hb(5120,a.b,function(l,n){return[_.m(l,n)]},[p.d,a.F]),a.hb(5120,gl.a,gl.b,[O.c]),a.hb(5120,yl.b,yl.a,[[3,yl.b]]),a.hb(4608,W.g,W.g,[]),a.hb(4608,W.z,W.z,[]),a.hb(4608,cl.g,cl.g,[cl.d,a.k]),a.hb(5120,jl.b,jl.c,[O.c]),a.hb(1073742336,p.c,p.c,[]),a.hb(1073742336,m.o,m.o,[[2,m.u],[2,m.l]]),a.hb(1073742336,s.b,s.b,[]),a.hb(1073742336,dl.A,dl.A,[]),a.hb(1073742336,dl.q,dl.q,[]),a.hb(1073742336,L.a,L.a,[]),a.hb(1073742336,dl.n,dl.n,[[2,dl.f],[2,B.g]]),a.hb(1073742336,dl.y,dl.y,[]),a.hb(1073742336,b.c,b.c,[]),a.hb(1073742336,kl.g,kl.g,[]),a.hb(1073742336,C.b,C.b,[]),a.hb(1073742336,O.g,O.g,[]),a.hb(1073742336,R.k,R.k,[]),a.hb(1073742336,ml.d,ml.d,[]),a.hb(1073742336,h.a,h.a,[]),a.hb(1073742336,pl.j,pl.j,[]),a.hb(1073742336,wl.c,wl.c,[]),a.hb(1073742336,vl.e,vl.e,[]),a.hb(1073742336,Zl.c,Zl.c,[]),a.hb(1073742336,Yl.b,Yl.b,[]),a.hb(1073742336,K.e,K.e,[]),a.hb(1073742336,fl.f,fl.f,[]),a.hb(1073742336,xl.c,xl.c,[]),a.hb(1073742336,M.c,M.c,[]),a.hb(1073742336,_.e,_.e,[]),a.hb(1073742336,S.b,S.b,[]),a.hb(1073742336,Al.a,Al.a,[]),a.hb(1073742336,Dl.a,Dl.a,[]),a.hb(1073742336,Sl.a,Sl.a,[[2,_.k],a.F]),a.hb(1073742336,A.f,A.f,[]),a.hb(1073742336,dl.w,dl.w,[]),a.hb(1073742336,dl.t,dl.t,[]),a.hb(1073742336,gl.d,gl.d,[]),a.hb(1073742336,yl.c,yl.c,[]),a.hb(1073742336,_l.o,_l.o,[]),a.hb(1073742336,Ll.a,Ll.a,[]),a.hb(1073742336,Fl.a,Fl.a,[]),a.hb(1073742336,Il.a,Il.a,[]),a.hb(1073742336,Kl,Kl,[]),a.hb(512,cl.d,cl.d,[]),a.hb(1024,cl.i,function(l){return[{wrappers:[{name:"form-field",component:Ol.c}]},{types:[{name:"input",component:Cl.a,wrappers:["form-field"]}]},{types:[{name:"textarea",component:Bl.a,wrappers:["form-field"]}]},{types:[{name:"radio",component:ql.a,wrappers:["form-field"]}]},{types:[{name:"checkbox",component:Ml.a,wrappers:["form-field"]}]},{types:[{name:"multicheckbox",component:Tl.a,wrappers:["form-field"]}]},{types:[{name:"select",component:Wl.a,wrappers:["form-field"]}]},cl.j(l),{}]},[cl.d]),a.hb(1073742336,cl.h,cl.h,[cl.d,[2,cl.i]]),a.hb(1073742336,W.w,W.w,[]),a.hb(1073742336,W.u,W.u,[]),a.hb(1073742336,Ol.b,Ol.b,[]),a.hb(1073742336,Cl.b,Cl.b,[]),a.hb(1073742336,Bl.b,Bl.b,[]),a.hb(1073742336,zl.c,zl.c,[]),a.hb(1073742336,Nl.a,Nl.a,[]),a.hb(1073742336,ql.b,ql.b,[]),a.hb(1073742336,Ml.b,Ml.b,[]),a.hb(1073742336,Tl.b,Tl.b,[]),a.hb(1073742336,Wl.b,Wl.b,[]),a.hb(1073742336,Pl.a,Pl.a,[]),a.hb(1073742336,I.w,I.w,[]),a.hb(1073742336,W.l,W.l,[]),a.hb(1073742336,$l.c,$l.c,[]),a.hb(1073742336,I.X,I.X,[]),a.hb(1073742336,dl.p,dl.p,[]),a.hb(1073742336,Vl.b,Vl.b,[]),a.hb(1073742336,El.c,El.c,[]),a.hb(1073742336,T.e,T.e,[]),a.hb(1073742336,I.H,I.H,[]),a.hb(1073742336,Rl.c,Rl.c,[]),a.hb(1073742336,Hl.d,Hl.d,[]),a.hb(1073742336,I.F,I.F,[]),a.hb(1073742336,jl.e,jl.e,[]),a.hb(1073742336,Ql.f,Ql.f,[]),a.hb(1073742336,I.u,I.u,[]),a.hb(1073742336,t,t,[]),a.hb(256,dl.g,dl.k,[]),a.hb(1024,m.j,function(){return[[{path:"",component:w},{path:":id",component:E}]]},[]),a.hb(256,Ql.a,{separatorKeyCodes:[Xl.f]},[])])})}}]);