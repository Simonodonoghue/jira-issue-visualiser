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

        // this is currently just a linear line with 2 points, 0 and totalEstimatedWork
        var totalEstimatedWork = 0

        // an object containing a 'total' series, as well as a series for each user
        var totalCompletedWork = {
            total: {}
        }

        props.issues.forEach(function (issue) {
            // TODO - if there's no due date set?

            if (issue.fields.timeoriginalestimate) {
                totalEstimatedWork += issue.fields.timeoriginalestimate
            }

            issue.fields.worklog.worklogs.forEach(function (worklog) {

                // add to total
                if (!(new Date(Date.parse(worklog.started)).toLocaleDateString('en-UK', options) in totalCompletedWork.total)) {
                    totalCompletedWork['total'][new Date(Date.parse(worklog.started)).toLocaleDateString('en-UK', options)] = 0
                }

                totalCompletedWork['total'][new Date(Date.parse(worklog.started)).toLocaleDateString('en-UK', options)] += worklog.timeSpentSeconds

                // add to user specific
                // make sure the user exists
                if (!(worklog.author.displayName in totalCompletedWork)) {
                    totalCompletedWork[worklog.author.displayName] = {}
                }

                if (!(new Date(Date.parse(worklog.started)).toLocaleDateString('en-UK', options) in totalCompletedWork[worklog.author.displayName])) {
                    totalCompletedWork[worklog.author.displayName][new Date(Date.parse(worklog.started)).toLocaleDateString('en-UK', options)] = 0
                }

                totalCompletedWork[worklog.author.displayName][new Date(Date.parse(worklog.started)).toLocaleDateString('en-UK', options)] += worklog.timeSpentSeconds
            })

        })

        this.state = {
            totalEstimatedWork: totalEstimatedWork / 60 / 60,
            totalCompletedWork: totalCompletedWork
        }


        console.log("done")

    }


    render() {

        var self = this
        var chartData = []

        Object.keys(this.state.totalCompletedWork).forEach(function (series, index) {
            // this is the series
            var seriesArray = {
                name: series,
                data: []
            }

            Object.keys(self.state.totalCompletedWork[series]).forEach(function (date) {
                // this is then the dates in the series
                seriesArray.data.push({
                    x: date,
                    y: self.state.totalCompletedWork[series][date] / 60 / 60
                })
            })

            chartData.push(seriesArray)

        })

        chartData.forEach(function (series) {
            series.data.sort(function (a, b) {
                if (moment(a.x).isAfter(b.x)) {
                    return 1
                } else if (moment(a.x).isBefore(b.x)) {
                    return -1
                }

                return 0
            })
        })


        chartData.forEach(function (series) {
            series.data.forEach(function (day, index) {
                if (index > 0) {
                    day.y += series.data[index - 1].y
                }
            })
        })

        // has any work been planned?
        if (chartData[0].data.length > 0) {
            chartData.push({
                name: "planned",
                data: [
                    {
                        x: chartData[0].data[0].x,
                        y: 0
                    },
                    {
                        x: chartData[0].data[chartData[0].data.length - 1].x,
                        y: this.state.totalEstimatedWork
                    }
                ]
            })
        }


        var options = {
            chart: {
                id: 'apexchart-example'
            },
            title: {
                text: "Completed to Planned Work",
                align: 'center',
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                    fontSize: '16px',
                    color: '#263238'
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
                <Chart options={options} series={chartData} type="line" width='70%' />
            </div >

        );
    }
}

export default ProjectCharts;
