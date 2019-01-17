/*
 Highcharts JS v5.0.14 (2019-01-17)
 Highcharts Drilldown module

 Author: Torstein Honsi
 License: www.highcharts.com/license

*/
(function(n){"object"===typeof module&&module.exports?module.exports=n:n(Highcharts)})(function(n){(function(f){var n=f.noop,A=f.color,B=f.defaultOptions,h=f.each,p=f.extend,H=f.format,C=f.objectEach,v=f.pick,r=f.wrap,q=f.Chart,w=f.seriesTypes,D=w.pie,t=w.column,E=f.Tick,x=f.fireEvent,F=f.inArray,G=1;p(B.lang,{drillUpText:"\u25c1 Back to {series.name}"});B.drilldown={animation:{duration:500},drillUpButton:{position:{align:"right",x:-10,y:10}}};f.SVGRenderer.prototype.Element.prototype.fadeIn=function(a){this.attr({opacity:.1,
visibility:"inherit"}).animate({opacity:v(this.newOpacity,1)},a||{duration:250})};q.prototype.addSeriesAsDrilldown=function(a,b){this.addSingleSeriesAsDrilldown(a,b);this.applyDrilldown()};q.prototype.addSingleSeriesAsDrilldown=function(a,b){var d=a.series,c=d.xAxis,e=d.yAxis,g,k=[],l=[],u,m,y;y={colorIndex:v(a.colorIndex,d.colorIndex)};this.drilldownLevels||(this.drilldownLevels=[]);u=d.options._levelNumber||0;(m=this.drilldownLevels[this.drilldownLevels.length-1])&&m.levelNumber!==u&&(m=void 0);
b=p(p({_ddSeriesId:G++},y),b);g=F(a,d.points);h(d.chart.series,function(a){a.xAxis!==c||a.isDrilling||(a.options._ddSeriesId=a.options._ddSeriesId||G++,a.options._colorIndex=a.userOptions._colorIndex,a.options._levelNumber=a.options._levelNumber||u,m?(k=m.levelSeries,l=m.levelSeriesOptions):(k.push(a),l.push(a.options)))});a=p({levelNumber:u,seriesOptions:d.options,levelSeriesOptions:l,levelSeries:k,shapeArgs:a.shapeArgs,bBox:a.graphic?a.graphic.getBBox():{},color:a.isNull?(new f.Color(A)).setOpacity(0).get():
A,lowerSeriesOptions:b,pointOptions:d.options.data[g],pointIndex:g,oldExtremes:{xMin:c&&c.userMin,xMax:c&&c.userMax,yMin:e&&e.userMin,yMax:e&&e.userMax}},y);this.drilldownLevels.push(a);c&&c.names&&(c.names.length=0);b=a.lowerSeries=this.addSeries(b,!1);b.options._levelNumber=u+1;c&&(c.oldPos=c.pos,c.userMin=c.userMax=null,e.userMin=e.userMax=null);d.type===b.type&&(b.animate=b.animateDrilldown||n,b.options.animation=!0)};q.prototype.applyDrilldown=function(){var a=this.drilldownLevels,b;a&&0<a.length&&
(b=a[a.length-1].levelNumber,h(this.drilldownLevels,function(a){a.levelNumber===b&&h(a.levelSeries,function(a){a.options&&a.options._levelNumber===b&&a.remove(!1)})}));this.redraw();this.showDrillUpButton()};q.prototype.getDrilldownBackText=function(){var a=this.drilldownLevels;if(a&&0<a.length)return a=a[a.length-1],a.series=a.seriesOptions,H(this.options.lang.drillUpText,a)};q.prototype.showDrillUpButton=function(){var a=this,b=this.getDrilldownBackText(),d=a.options.drilldown.drillUpButton,c,e;
this.drillUpButton?this.drillUpButton.attr({text:b}).align():(e=(c=d.theme)&&c.states,this.drillUpButton=this.renderer.button(b,null,null,function(){a.drillUp()},c,e&&e.hover,e&&e.select).addClass("highcharts-drillup-button").attr({align:d.position.align,zIndex:7}).add().align(d.position,!1,d.relativeTo||"plotBox"))};q.prototype.drillUp=function(){for(var a=this,b=a.drilldownLevels,d=b[b.length-1].levelNumber,c=b.length,e=a.series,g,k,l,f,m=function(c){var b;h(e,function(a){a.options._ddSeriesId===
c._ddSeriesId&&(b=a)});b=b||a.addSeries(c,!1);b.type===l.type&&b.animateDrillupTo&&(b.animate=b.animateDrillupTo);c===k.seriesOptions&&(f=b)};c--;)if(k=b[c],k.levelNumber===d){b.pop();l=k.lowerSeries;if(!l.chart)for(g=e.length;g--;)if(e[g].options.id===k.lowerSeriesOptions.id&&e[g].options._levelNumber===d+1){l=e[g];break}l.xData=[];h(k.levelSeriesOptions,m);x(a,"drillup",{seriesOptions:k.seriesOptions});f.type===l.type&&(f.drilldownLevel=k,f.options.animation=a.options.drilldown.animation,l.animateDrillupFrom&&
l.chart&&l.animateDrillupFrom(k));f.options._levelNumber=d;l.remove(!1);f.xAxis&&(g=k.oldExtremes,f.xAxis.setExtremes(g.xMin,g.xMax,!1),f.yAxis.setExtremes(g.yMin,g.yMax,!1))}x(a,"drillupall");this.redraw();0===this.drilldownLevels.length?this.drillUpButton=this.drillUpButton.destroy():this.drillUpButton.attr({text:this.getDrilldownBackText()}).align();this.ddDupes.length=[]};t.prototype.animateDrillupTo=function(a){if(!a){var b=this,d=b.drilldownLevel;h(this.points,function(a){var b=a.dataLabel;
a.graphic&&a.graphic.hide();b&&(b.hidden="hidden"===b.attr("visibility"),b.hidden||(b.hide(),a.connector&&a.connector.hide()))});setTimeout(function(){b.points&&h(b.points,function(a,b){b=b===(d&&d.pointIndex)?"show":"fadeIn";var c="show"===b?!0:void 0,e=a.dataLabel;if(a.graphic)a.graphic[b](c);if(e&&!e.hidden&&(e[b](c),a.connector))a.connector[b](c)})},Math.max(this.chart.options.drilldown.animation.duration-50,0));this.animate=n}};t.prototype.animateDrilldown=function(a){var b=this,d=this.chart.drilldownLevels,
c,e=this.chart.options.drilldown.animation,g=this.xAxis;a||(h(d,function(a){b.options._ddSeriesId===a.lowerSeriesOptions._ddSeriesId&&(c=a.shapeArgs)}),c.x+=v(g.oldPos,g.pos)-g.pos,h(this.points,function(a){a.graphic&&a.graphic.attr(c).animate(p(a.shapeArgs,{fill:a.color||b.color}),e);a.dataLabel&&a.dataLabel.fadeIn(e)}),this.animate=null)};t.prototype.animateDrillupFrom=function(a){var b=this.chart.options.drilldown.animation,d=this.group,c=d!==this.chart.seriesGroup,e=this;h(e.trackerGroups,function(a){if(e[a])e[a].on("mouseover")});
c&&delete this.group;h(this.points,function(e){var g=e.graphic,l=a.shapeArgs,h=function(){g.destroy();d&&c&&(d=d.destroy())};g&&(delete e.graphic,b?g.animate(l,f.merge(b,{complete:h})):(g.attr(l),h()))})};D&&p(D.prototype,{animateDrillupTo:t.prototype.animateDrillupTo,animateDrillupFrom:t.prototype.animateDrillupFrom,animateDrilldown:function(a){var b=this.chart.options.drilldown.animation,d=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1].shapeArgs,c=d.start,e=(d.end-c)/this.points.length;
a||(h(this.points,function(a,k){var g=a.shapeArgs;if(a.graphic)a.graphic.attr(f.merge(d,{start:c+k*e,end:c+(k+1)*e}))[b?"animate":"attr"](g,b)}),this.animate=null)}});f.Point.prototype.doDrilldown=function(a,b,d){var c=this.series.chart,e=c.options.drilldown,g=(e.series||[]).length,f;c.ddDupes||(c.ddDupes=[]);for(;g--&&!f;)e.series[g].id===this.drilldown&&-1===F(this.drilldown,c.ddDupes)&&(f=e.series[g],c.ddDupes.push(this.drilldown));x(c,"drilldown",{point:this,seriesOptions:f,category:b,originalEvent:d,
points:void 0!==b&&this.series.xAxis.getDDPoints(b).slice(0)},function(b){var c=b.point.series&&b.point.series.chart,d=b.seriesOptions;c&&d&&(a?c.addSingleSeriesAsDrilldown(b.point,d):c.addSeriesAsDrilldown(b.point,d))})};f.Axis.prototype.drilldownCategory=function(a,b){C(this.getDDPoints(a),function(d){d&&d.series&&d.series.visible&&d.doDrilldown&&d.doDrilldown(!0,a,b)});this.chart.applyDrilldown()};f.Axis.prototype.getDDPoints=function(a){var b=[];h(this.series,function(d){var c,e=d.xData,g=d.points;
for(c=0;c<e.length;c++)if(e[c]===a&&d.options.data[c]&&d.options.data[c].drilldown){b.push(g?g[c]:!0);break}});return b};E.prototype.drillable=function(){var a=this.pos,b=this.label,d=this.axis,c="xAxis"===d.coll&&d.getDDPoints,e=c&&d.getDDPoints(a);c&&(b&&e.length?(b.drillable=!0,b.addClass("highcharts-drilldown-axis-label").on("click",function(b){d.drilldownCategory(a,b)})):b&&b.drillable&&(b.on("click",null),b.removeClass("highcharts-drilldown-axis-label")))};r(E.prototype,"addLabel",function(a){a.call(this);
this.drillable()});r(f.Point.prototype,"init",function(a,b,d,c){var e=a.call(this,b,d,c);c=(a=b.xAxis)&&a.ticks[c];e.drilldown&&f.addEvent(e,"click",function(a){b.xAxis&&!1===b.chart.options.drilldown.allowPointDrilldown?b.xAxis.drilldownCategory(e.x,a):e.doDrilldown(void 0,void 0,a)});c&&c.drillable();return e});r(f.Series.prototype,"drawDataLabels",function(a){var b=this.chart.options.drilldown.activeDataLabelStyle,d=this.chart.renderer;a.call(this);h(this.points,function(a){var c=a.options.dataLabels,
f=v(a.dlOptions,c&&c.style,{});a.drilldown&&a.dataLabel&&("contrast"===b.color&&(f.color=d.getContrast(a.color||this.color)),c&&c.color&&(f.color=c.color),a.dataLabel.addClass("highcharts-drilldown-data-label"))},this)});var z=function(a,b,d){a[d?"addClass":"removeClass"]("highcharts-drilldown-point")},I=function(a){a.call(this);h(this.points,function(a){a.drilldown&&a.graphic&&z(a.graphic,"pointer",!0)})},J=function(a,b){var d=a.apply(this,Array.prototype.slice.call(arguments,1));this.drilldown&&
this.series.halo&&"hover"===b?z(this.series.halo,"pointer",!0):this.series.halo&&z(this.series.halo,"auto",!1);return d};C(w,function(a){r(a.prototype,"drawTracker",I);r(a.prototype.pointClass.prototype,"setState",J)})})(n)});