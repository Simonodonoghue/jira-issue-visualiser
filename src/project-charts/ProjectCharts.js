import React, { Component } from 'react';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import { FaAudible } from 'react-icons/fa'
import './ProjectCharts.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import '../../node_modules/react-vis/dist/style.css';
import Chart from 'react-apexcharts'
import moment from 'moment';

class ProjectCharts extends Component {

    constructor(props) {
        super(props)

        var options = {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit'
        };

        // sum the worklogs array data for each array to get updates over time for SPI chart
        // hours on left y, number of tasks on right y

        var totalEstimatedWork = 0
        var totalCompletedWork = {}

        props.issues.forEach(function (issue) {
            // TODO - if there's no due date set?

            if (issue.fields.timeoriginalestimate) {
                totalEstimatedWork += issue.fields.timeoriginalestimate
            }

            issue.fields.worklog.worklogs.forEach(function (worklog) {
                if (!(new Date(Date.parse(worklog.started)).toLocaleDateString('en-UK', options) in totalCompletedWork)) {
                    totalCompletedWork[new Date(Date.parse(worklog.started)).toLocaleDateString('en-UK', options)] = 0
                }

                totalCompletedWork[new Date(Date.parse(worklog.started)).toLocaleDateString('en-UK', options)] += worklog.timeSpentSeconds
            })
        })

        this.state = {
            totalEstimatedWork: totalEstimatedWork /60 / 60,
            totalCompletedWork: totalCompletedWork
        }

        console.log("done")

    }


    render() {

        var self = this
        var chartData = []
        Object.keys(this.state.totalCompletedWork).forEach(function (item) {
            chartData.push({
                x: item,
                y: self.state.totalCompletedWork[item] / 60 / 60
            })
        })

        chartData.sort(function (a, b) {
            if (moment(a.x).isAfter(b.x)) {
                return 1
            } else if (moment(a.x).isBefore(b.x)) {
                return -1
            }

            return 0
        })

        chartData.forEach(function (day, index) {
            if (index > 0) {
                day.y += chartData[index - 1].y
            }
        })

        var options = {
            chart: {
                id: 'apexchart-example',
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                }
            },
            xaxis: {
                type: 'datetime'
            },
            legend: {
                show: true,
                position: 'bottom',
                onItemClick: {
                    toggleDataSeries: true
                },
            }
        }


        return (

            <div>
                <Chart options={options} series={[{ data: chartData }, { data: [{ x: chartData[0].x, y: 0 }, { x: chartData[chartData.length - 1].x, y: this.state.totalEstimatedWork }] }]} type="line" width={500} height={320} />
            </div >

        );
    }
}

export default ProjectCharts;
