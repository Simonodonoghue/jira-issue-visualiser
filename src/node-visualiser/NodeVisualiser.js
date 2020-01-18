import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import { FaAudible } from 'react-icons/fa'
import './NodeVisualiser.css';
import * as d3 from 'd3';
import { event as currentEvent } from 'd3';
import {
    Link
} from "react-router-dom";

const getEvent = () => event;

class NodeVisualiser extends Component {

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

        var links = []

        json.issues.forEach(issue => {
            issue.fields.subtasks.forEach(subtask => {
                // find the item in nodes
                json.issues.forEach(subtaskFind => {
                    if (subtaskFind.key == subtask.key) {
                        links.push({
                            source: issue.id,
                            target: subtaskFind.id
                        })
                    }
                })
            })

            issue.fields.issuelinks.forEach(issuelink => {
                // find the item in nodes
                if (issuelink.outwardIssue) {
                    json.issues.forEach(subtaskFind => {
                        if (subtaskFind.key == issuelink.outwardIssue.key) {
                            links.push({
                                source: issue.id,
                                target: subtaskFind.id
                            })
                        }
                    })
                }

            })
        });

        var force = d3.forceSimulation(json.issues)
            .force("charge", d3.forceManyBody().strength(-3000))
            .force("center", d3.forceCenter(w / 2, h / 2))
            .force("x", d3.forceX(w / 2).strength(1))
            .force("y", d3.forceY(h / 2).strength(1))
            .force("link", d3.forceLink(links).id(function (d) { return d.id; })
                .distance(50)
                .strength(1))
            .on("tick", tick);


        var link = vis.selectAll("line.link")
            .data(links)
            .enter().append("svg:line")
            .attr("class", function (d) {
                if (d.target.fields.status.name == 'To Do') {
                    return "link-to-do"
                } else if (d.target.fields.status.name == 'In Progress') {
                    return "link-in-progress"
                } else {
                    return "link-done"
                }
            })

        /*var node_drag = d3.behavior.drag()
            .on("dragstart", dragstart)
            .on("drag", dragmove)
            .on("dragend", dragend);*/

        function dragstart(d, i) {
            force.stop() // stops the force auto positioning before you start dragging
        }

        function dragmove(d, i) {
            d.px += currentEvent.dx;
            d.py += currentEvent.dy;
            d.x += currentEvent.dx;
            d.y += currentEvent.dy;
            tick(); // this is the key to make it work together with updating both px,py,x,y on d !
        }

        function dragend(d, i) {
            d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
            tick();
            force.resume();
        }


        var node = vis.selectAll("g.node")
            .data(json.issues)
            .enter().append("svg:g")
            .attr("class", "node")
        //    .call(node_drag);

        node.append("svg:image")
            .attr("class", "circle")
            .attr("xlink:href", function (node) { return node.fields.issuetype.iconUrl })
            .attr("x", "-8px")
            .attr("y", "-8px")
            .attr("width", "16px")
            .attr("height", "16px")
            .on('click', (d) => {
                if (currentEvent.defaultPrevented) return;
                this.props.nodeClickHandler(d)
            });

        node.append("svg:text")
            .attr("class", "nodetext")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function (d) { return d.key });


        function tick() {
            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

            link.attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });
        };

    }

    render() {


        return (

            <div>

                <svg id='node-graph'></svg>


            </div>

        );
    }
}

export default NodeVisualiser;
