# Offline copy of Rackspace Status Page

Rackspace uses [StatusPage.io](https://statuspage.io) to host a status/uptime page for all of its services. StatusPage.io provides the ability to create custom CSS/HTML to affect the appearance of the status page, but its tooling for doing so is very limited.

This repository is a completely static HTML file grabbed from the Statuspage website and modified to accommodate a modern development workflow using Grunt.

## Installation

`$ npm install`

## Usage

`$ grunt`

View the status page at `http://localhost:3000`.

## Building

`$ grunt build`

Copy the contents of `build/` into their respective places in the StatusPage UI.