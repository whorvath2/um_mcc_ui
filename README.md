# University of Michigan Meeting Cost Calculator

## Summary

This is an application for calculating the cost of meetings that include University of Michigan staff.

## Description

The purpose of this application is to provide an easy means of calculating the cost of one or more University of Michigan staff attending any particular meeting. By choosing meeting attendees and entering the meeting's length, the user can see the actual cost of the meeting in terms of how much the university is spending to have the attendees there.


## Inspiration

Meeting invitations are often sent without an agenda, which makes their business value very difficult to determine. Knowing what they will cost brings a new level of accountability to the organizer.

## Technical Details

This is a [react](https://reactjs.org)-based UI that uses the [um_mcc](https://github.com/whorvath2/um_mcc) API to calculate the cost of a meeting that includes University of Michigan staff. It leverages [publicly available salary data](https://www.dropbox.com/s/ti4iff026agzpak/salary-disclosure-2022.pdf?dl=0) to enable the search and selection of meeting attendees and the calculation of meeting cost.

## Dependencies

This application's services (the UI and the back end) can be run independently, however it's designed to run in a VM capable of running containerized applications, such as [podman](https://podman.io/getting-started/installation). The [compose](compose.yaml) file enables orchestration tools like [podman-compose](https://github.com/containers/podman-compose) to launch the entire suite of services together.

## Building

To build the container images, open a terminal session in this directory, then build the images:  

```
podman build --tag um_mcc_ui_image .
cd um_mcc
podman build --tag um_mcc_image .
```

## Usage

To launch the application in the same terminal session, use your orchestration tool (`podman-compose` in this case):

```
cd ../
podman-compose up -d
```

To see the application, [open your browser to localhost:3000](http://localhost:3000/).


## Version

1.1.0

## Disclaimers

University of Michigan, UM, U-M, and U of M are trademarks™ or registered® trademarks of the University of Michigan. Use of them does not imply any affiliation with or endorsement by the University of Michigan. For all other disclaimers, [see the LICENSE file in this repository](LICENSE).

_Thank you termly.io for the disclaimer language._

_Copyright ©️ 2023 William L Horvath II_