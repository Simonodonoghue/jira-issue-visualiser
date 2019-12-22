import React, { Component } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap'
import { FaAudible } from 'react-icons/fa'
import './NodeVisualiser.css';
import * as d3 from 'd3';
import {event as currentEvent} from 'd3';
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

        var force = d3.layout.force()
            .nodes(json.issues)
            .gravity(.039)
            .distance(20)
            .charge(-220)
            .size([w, h])
            .start()

        var links = []

        force.nodes().forEach(issue => {
            issue.fields.subtasks.forEach(subtask => {
                // find the item in nodes
                force.nodes().forEach(subtaskFind => {
                    if (subtaskFind.key == subtask.key) {
                        links.push({
                            source: issue.index,
                            target: subtaskFind.index
                        })
                    }
                })
            })

            issue.fields.issuelinks.forEach(issuelink => {
                // find the item in nodes
                if (issuelink.outwardIssue) {
                    force.nodes().forEach(subtaskFind => {
                        if (subtaskFind.key == issuelink.outwardIssue.key) {
                            links.push({
                                source: issue.index,
                                target: subtaskFind.index
                            })
                        }
                    })
                }

            })
        });

        force.links(links)

        force = force.start()

        console.log(force.links())

        var link = vis.selectAll("line.link")
            .data(force.links())
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
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        var node_drag = d3.behavior.drag()
            .on("dragstart", dragstart)
            .on("drag", dragmove)
            .on("dragend", dragend);

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
            .call(node_drag);

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

        force.on("tick", tick);

        function tick() {
            link.attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            node.attr("transform", function (d) { return "translate(" + Math.max(radius, Math.min(w - radius, d.x)) + "," + Math.max(radius, Math.min(h - radius, d.y)) + ")"; });
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
