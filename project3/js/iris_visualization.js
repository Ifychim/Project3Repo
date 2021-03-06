function load_iris_visualization1(svg_name, data){

    //console.log("HEREREER");
    let chart = d3.select(svg_name);
    let margin2 = 50;
    let width = $(svg_name).width() - margin2;
    let height = $(svg_name).height()- margin2;

    

    //grouping
    //let g = chart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let g = chart.append("g")
                .attr("transform", "translate(" + 55 + "," + 3 + ")");

    
    //Adding Label to chart (title)
    g.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "25px")
        .attr("font-weight", "bold")
        .attr("x", 550)
        .attr("y", 20)
        .text("Iris Plant Robustness");
              

    //x,y scales
    let x = d3.scaleBand()
                .range([0, width])//output
                //.domain([0, data.length-1])//change this
                .domain(data.map(function(data) { return data.class; }))//input
                .padding(0.35);

    //Appending x-axis to chart and labeling it 
    g.append("g")
        .attr("transform", "translate(0," + height+")")
        .call(d3.axisBottom(x));
        
    g.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "15px")
        .attr("font-weight", "bold")
        .attr("transform", "rotate(-90)")
        .attr("x", -height + 350)
        .attr("y", -40)
        .text("Average Plant Robustness (CM)");
        
    let y = d3.scaleLinear()
                .range([height, 0]) //output
                .domain([0,20]); //input
    
    //Appending y-axis to chart and labeling it 
    g.append("g").call(d3.axisLeft(y));

    g.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "15px")
        .attr("font-weight", "bold")
        .attr("x", width-400)
        .attr("y", height+35)
        .text("Iris Plant Class");

    //console.log((data.map(function(data) { return data})));
    
    //Creating the "Bars" of the bar chart
    g.selectAll("bar-graph")
         .data(data)
         .enter()
         .append("rect")
            .attr("x", function(d) { return x(d.class); })
            .attr("y", function(d) { return y(0); }) // no bars at the start
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return  height - y(0); }) // no bars at the start
            .style("fill", "#000000")//filling each bar with black color;
            .on("mouseover", mouseover_event)
            .on("mouseout",mouseout_event)

    //Interactivity (FUNCTIONS AND ANIMATIONS)

    //Animation (Display Bar Chart)

    g.selectAll("rect")
        .transition()
        .duration(1700)
        .attr("y", function(d){return y(d.robustness)})
        .attr("height", function(d) { return  height- y(d.robustness); })
    

    g.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "15px")
        .attr("font-weight", "bold")
        .style("fill", "#000000")
        .attr("x", width-630)
        .attr("y", height-110)
        .text(data[0].robustness + " CM");
    
    g.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "15px")
        .attr("font-weight", "bold")
        .style("fill", "#000000")
        .attr("x", width-380)
        .attr("y", height-130)
        .text(data[1].robustness + " CM");

    g.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "15px")
        .attr("font-weight", "bold")
        .style("fill", "#000000")
        .attr("x", width-380)
        .attr("y", height-130)
        .text(data[1].robustness + " CM");
    
    g.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "15px")
        .attr("font-weight", "bold")
        .style("fill", "#000000")
        .attr("x", width-135)
        .attr("y", height-190)
        .text(data[2].robustness + " CM");
    

    function mouseover_event(d, i){
        d3.select(this)
            .style("fill", "orange");
	}

    
	function mouseout_event(d, i){
		d3.select(this)
            .transition()
            .duration(250)
            .style("fill", "#000000");
	}
           
}

function load_iris_visualization2(svg_name, data){

    let chart = d3.select(svg_name);
    let margin2 = 50;
    let width = $(svg_name).width() - margin2;
    let height = $(svg_name).height()- margin2;

    //grouping all elements within "Chart/SVG"
    let g = chart.append("g")
                .attr("transform", "translate(" + 70 + "," + 5 + ")");

    //Adding Label to chart (title)
    g.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "25px")
        .attr("font-weight", "bold")
        .attr("x", 575)
        .attr("y", 20)
        .text("Sepal Width vs Petal Width");

    //x,y scales
    let x = d3.scaleLinear()
                .range([0, width])//output
                .domain([2*0.95, 5]);//input
    
    //Appending x-axis to chart and labeling it 
    g.append("g")
        .attr("transform", "translate(0," + height+")")
        .call(d3.axisBottom(x));
    
    g.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .attr("x", width-400)
        .attr("y", height+35)
        .text("Sepal Width (CM)");   
    
    let y = d3.scaleLinear()
                .range([height, 0]) //output
                .domain([0, 3]); //input
    
    
    //Appending y-axis to chart and labeling it 
    g.append("g").call(d3.axisLeft(y));

   
    g.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "15px")
        .attr("font-weight", "bold")
        .attr("transform", "rotate(-90)")
        .attr("x", -150)
        .attr("y", -50)
        .text("Petal Width (CM)");
    
    //Hue Scale
    let hue = d3.scaleOrdinal()
                       .domain(["setosa", "versicolor", "virginica" ])
                       .range([ "#50C75D", "#C750B5", "#50C7C7"])


 

    //Interactivity Functions (highlighting & unhighlighting specific cluster of data)

    //This function is to highlight the selected cluster of data.
    var highlighting  = function(d){

        iris_category = d.class

        d3.selectAll("circles")
            .transition()
            .duration(300)
            .style("fill", "black")
            .attr("r", 5)
        
        d3.selectAll("." + iris_category)
            .transition()
            .duration(300)
            .style("fill", hue(iris_category))
            .attr("r", 5)
    }

    //This function is to (UN)highlight clusters of data.
    var unhighlight = function(){
        d3.selectAll(".points")
            .transition()
            .duration(100)
            .style("fill", "black")
            .attr("r", 5)
    }
    
    //Creating the "dots" of the scatter plot
    g.selectAll("circles")
         .data(data)
         .enter()
         .append("circle")
            .attr("class", function (d) { return "points " + d.class } )
            .attr("cx",function(d){ return x(d.sepal_width); })
            .attr("cy",function(d){ return y(d.petal_width); })
            .attr("r", 5)
            .style("fill", function (d) { return hue(d.class) } )
         .on("mouseover",highlighting)
         .on("mouseleave", unhighlight)
    
    
    //Creating the legend for this visualization
    g.append("circle").attr("cx",680).attr("cy",130).attr("r", 7).style("fill", "#50C75D")
    g.append("circle").attr("cx",680).attr("cy",160).attr("r", 7).style("fill", "#C750B5")
    g.append("circle").attr("cx",680).attr("cy",190).attr("r", 7).style("fill", "#50C7C7")
    g.append("text").attr("x", 700).attr("y", 100).text("LEGEND").style("font-size", "15px").style("font-weight", "bold").attr("alignment-baseline","middle")
    g.append("text").attr("x", 700).attr("y", 130).text("iris-setosa").style("font-size", "15px").attr("alignment-baseline","middle")
    g.append("text").attr("x", 700).attr("y", 160).text("iris-versicolor").style("font-size", "15px").attr("alignment-baseline","middle")
    g.append("text").attr("x", 700).attr("y", 190).text("iris-virginica").style("font-size", "15px").attr("alignment-baseline","middle")
    
    
}

function load_iris_visualization3(svg_name, data, tip){

    //console.log("HEREREER");
    let chart = d3.select(svg_name);
    let margin2 = 50;
    let width = $(svg_name).width() - margin2;
    let height = $(svg_name).height()- margin2;

    //grouping
    //let g = chart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let g = chart.append("g")
                .attr("transform", "translate(" + 55 + "," + 3 + ")");

    //Adding Label to chart (title)
    g.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "15px")
        .attr("font-weight", "bold")
        .attr("x", 600)
        .attr("y", 20)
        .text("Distribution of Sepal Length Amongst Iris Plants");
            
    //x,y scales
    //x axis
    let x = d3.scaleLinear()
                .range([0, width])//output
                .domain([4, 10]);//input

    //Appending x-axis to chart and labeling it 
    g.append("g")
        .attr("transform", "translate(0," + height+")")
        .call(d3.axisBottom(x));
        
    g.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("font-size", "15px")
        .attr("font-weight", "bold")
        .attr("x", width-400)
        .attr("y", height+35)
        .text("Sepal Length(CM)");



    //Creating histogram model & Bins
    var histogram = d3.histogram()
        .value(function(data) {return data.sepal_length;})
        .domain(x.domain())
        .thresholds(x.ticks(40));
    

    var bin = histogram(data);
    
    
    //y axis
    let y = d3.scaleLinear()
                .range([height, 0]) //output
                .domain([0,20]); //input
    
    //Appending y-axis to chart and labeling it 
    g.append("g").call(d3.axisLeft(y));

    g.append("text")
        .attr("text-anchor", "end")
        .attr("font-size", "15px")
        .attr("font-weight", "bold")
        .attr("transform", "rotate(-90)")
        .attr("x", -height + 300)
        .attr("y", -40)
        .text("Number of Iris-Setosa Plants");

    //Creating tooltip
    var tooltip = tip;
        tooltip.attr("class", "d3-tip")
               .offset(function() {
                   if(curr_position[0] > 650) {
                       return [-10,50] 
                    } 
                    else { 
                        return [10,10]
                    }
                }).html(
                    "<div id='toolTipDiv'></div>"
                );

    //Calling our tooltip to be used on the Visualization
    g.call(tooltip);              
    //appending data from bin to the histogram
    g.selectAll("histogram")
            .data(bin)
            .enter()
            .append("rect")
               .attr("x",1)
               .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
               .attr("width", 10)
               .attr("height", function(d) { return height - y(d.length); })
               .style("fill", "#C78B50")
               //Defining mouseover function for tooltip
               .on("mouseover", function(d,i){
                    d3.select(this).style("fill", "red");
                    curr_position = d3.mouse(this); 
                    curr_state = d.act_data;
                    num_plants = d.length;
                    //Show the tooltip
                    tooltip.show();

                    //Designing our tooltip via 'toolTipDiv'
                    var tool_tip_design = d3.select("#toolTipDiv")
                                                .append("svg")
                                                    .attr("width", 500)
                                                    .attr("height", 55);

                    tool_tip_design.append("text")
                                        .text("# iris setosa plant: " + num_plants)
                                        .style("fill", "green")
                                        .style("font-weight", "bold")
                                        .attr("x", 10)
                                        .attr("y", 10)
            })
            //Defining mouseout function for tooltip
            .on("mouseout", function(d) {

                d3.select(this).style("fill", "#C78B50");
                tooltip.hide();
            })
}





