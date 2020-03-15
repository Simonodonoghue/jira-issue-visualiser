import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import { FaAudible } from 'react-icons/fa'
import * as d3 from 'd3';
import { event as currentEvent } from 'd3';
import {
    Link
} from "react-router-dom";

const getEvent = () => event;

class TrelloVisualiser extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        var json = this.props.data

        var w = window.innerWidth - 85,
            h = window.innerHeight,
            radius = 15

        var vis = d3.select("#node-graph")
            .attr("width", w)
            .attr("height", h);

        var links = localStorage.getItem(sessionStorage.getItem('selectedBoard')) ? JSON.parse(localStorage.getItem(sessionStorage.getItem('selectedBoard'))) : []

        var colourMap = {}

        var force = d3.forceSimulation(json)
            .force("charge", d3.forceManyBody().strength(-4000))
            .force("center", d3.forceCenter(w / 2, h / 2))
            .force("x", d3.forceX(w / 2).strength(1))
            .force("y", d3.forceY(h / 2).strength(1))
            .force("link", d3.forceLink(links).id(function (d) { return d.id; })
                .distance(50)
                .strength(1))
            .on("tick", tick);

        var linkGroup = vis.append("svg:g")
        var link = linkGroup.selectAll("line.link")
            .data(links)
            .enter().append("svg:line")
            .attr("stroke", "#999")
            .attr("stroke-width", 5);


        var node = vis.selectAll("g.node")
            .data(json)
            .enter().append("svg:g")

        var self = this
        node.append("circle")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .attr("r", 10)
            .attr("fill", function (n) {
                if (!(n.idList in colourMap)) {
                    colourMap[n.idList] = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
                }

                return colourMap[n.idList]
            })
            .on('click', function (node) {
                if (self.state && self.state.nodeA) {
                    links.push({ source: self.state.nodeA.id, target: node.id })


                    vis.selectAll("line").remove()

                    force.force("link", d3.forceLink(links).id(function (d) { return d.id; })
                        .distance(50)
                        .strength(1))

                    link = linkGroup.selectAll("line.link")
                        .data(links)
                        .enter().append("svg:line")
                        .attr("stroke", "#999")
                        .attr("stroke-width", 5);

                    function saveLinks() {
                        var saveArray = []

                        links.forEach(function(item) {
                            saveArray.push({source: item.source.id, target: item.target.id})
                        })

                        return saveArray
                    }

                    localStorage.setItem(sessionStorage.getItem('selectedBoard'), JSON.stringify(saveLinks(links)))

                    self.setState({
                        nodeA: undefined
                    })

                } else {
                    self.setState({
                        nodeA: node
                    })
                }

            })

        node.append("svg:text")
            .attr("class", "nodetext")
            .attr("dx", 12)
            .text(function (d) { return d.name });


        function tick() {
            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

            link.attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });
        };

        node.call(d3.drag()
            .subject(dragsubject)
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

        function dragsubject() {
            return force.find(d3.event.x, d3.event.y);
        }

        function dragstarted() {
            if (!d3.event.active) force.alphaTarget(0.3).restart();
            d3.event.subject.fx = d3.event.subject.x;
            d3.event.subject.fy = d3.event.subject.y;
        }

        function dragged() {
            d3.event.subject.fx = d3.event.x;
            d3.event.subject.fy = d3.event.y;
        }

        function dragended() {
            if (!d3.event.active) force.alphaTarget(0);
            d3.event.subject.fx = null;
            d3.event.subject.fy = null;
        }

    }

    render() {
        if (this.state && this.state.nodeA) {
            console.log(this.state.nodeA)
        }

        return (

            <div>

                <svg id='node-graph'></svg>


            </div>

        );
    }
}

export default TrelloVisualiser;
