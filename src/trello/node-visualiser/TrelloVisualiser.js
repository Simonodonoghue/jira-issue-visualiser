import React, { Component } from 'react';
import { Breadcrumb, Nav, Container, Row, Col } from 'react-bootstrap'
import { FaAudible, FaCloudShowersHeavy } from 'react-icons/fa'
import * as d3 from 'd3';
import { event as currentEvent } from 'd3';
import {
    Link
} from "react-router-dom";

const getEvent = () => event;

class TrelloVisualiser extends Component {

    constructor(props) {
        super(props)


        var colourMap = {}

        props.lists.forEach(function (list) {
            if (!(list.id in colourMap)) {
                colourMap[list.id] = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)
            }
        })


        this.state = {
            colourMap: colourMap
        }
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

        // check the links - some of the cards may have been removed on Trello
        var newLinks = []
        links.forEach(function (link) {
            var foundSource = false
            var foundTarget = false

            for (var i = 0; i < json.length && (!foundSource || !foundTarget); i++) {
                if (link.source == json[i].id) {
                    foundSource = true
                }

                if (link.target == json[i].id) {
                    foundTarget = true
                }
            }

            if (foundSource && foundTarget) {
                newLinks.push(link)
            }
        })

        links = newLinks

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


                return self.state.colourMap[n.idList]
            })
            .on('click', function (node) {
                if (self.state && self.state.nodeA) {

                    /*links.forEach(function(item) {
                        if (item.source == node.id || item.target == node.id)
                    })*/
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

                        links.forEach(function (item) {
                            saveArray.push({ source: item.source.id, target: item.target.id })
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

    generateLegend() {
        var legend = []

        var self = this

        this.props.lists.forEach(function (list) {
            legend.push(
                <Col sm={3} className="mb-2">
                    <Row>
                        <Col sm={2}>
                            <div style={{ backgroundColor: self.state.colourMap[list.id], height: '24px', width: '100%' }}></div>
                        </Col>
                        <Col sm={10}>
                            <b>{list.name}</b>
                        </Col>
                    </Row>
                </Col>
            )
        })

        return legend
    }

    render() {
        if (this.state && this.state.nodeA) {
            console.log(this.state.nodeA)
        }

        if (this.props.data && this.props.lists) {
            return (

                <div>
                    <Row>
                        <Col className="mt-2">
                            <Breadcrumb>
                                {this.generateLegend()}
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <svg id='node-graph'></svg>


                </div>

            );
        } else {
            return (<div>loading</div>)
        }

    }
}

export default TrelloVisualiser;
