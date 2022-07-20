# CSV-W Builder Prototype

This prototype is an attempt to present a user interface on top of existing linked data tooling to help users build CSV-Ws from their existing CSV data.

It will allow users to upload a CSV file along with (optional) accompanying metadata files, provide basic metadata about the overall dataset and then generate a form for them to complete to describe each column of their data. If the optional metadata files are provided, some of this form may be pre-populated with values drawn from the files.

The [csvcubed](https://github.com/GSS-Cogs/csvcubed) tool will be used to generate the files comprising the CSV-W at the end.
This prototype currently uses the [Gov.UK Prototype Kit](https://govuk-prototype-kit.herokuapp.com/docs) which facilitates rapid prototyping using
the [Gov.UK Design System](https://design-system.service.gov.uk/get-started/). For details of frontend components being used see these resources.

# Getting Started

`npm install` to install dependencies

`npm start` to run the site, which should report the website to be available on `http://localhost:3000`

Changes will likely be needed primarily in the app/ directory, where app/views/ provide the HTML for each page, and app/routes.js the currently used logic behind each page submission.

# Iteration Plan

As this is a prototype, we don't expect it to be the final home of some of this functionality and some problems like file management are being solved in other places. This work should focus on proving the user  experience of generating forms specific to the provided CSV and submitting metadata programatically to csvcubed.

## Initially, aiming for a minimum viable demo.
Only most basic behaviour in place, but running in a local server manner:

- User can 'upload' a CSV file, which is stored on the local server
- User can provide metadata fields for dataset
- User is presented metadata fields for each column
    - This may initially take the shape of one very long form, the UX can be iterated separately
- User can submit metadata form, and csvcubed is called
- Results of csvcubed are stored on the local server
- Links to the resultant files are visible to the user via the interface

## Then, provide initial metadata
The optional qube-config.json file can be provided and the values used to inform the journey:

- User can 'upload' the qube-config.json file
- JSON file can be interpretted, and impact the form shown

Results should be submitted and presented the same

## Moving beyond prototype
Once these behaviours are in place, the prototype can be used to demonstrate the ability of csvcubed
to those who would not be able to install the tool directly and also for user testing to ensure the 
journey is straightforward for users.

This CSV-W Builder may then evolve into a part of the [dd-cms](https://github.com/GSS-Cogs/dd-cms) codebase
or may find a home as an independent tool. Depending on which direction we take at that point, the 
file upload components and error handling may need further work or may be impacted by the codebase it 
moves to.

