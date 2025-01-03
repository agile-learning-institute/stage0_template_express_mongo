# TEMPLATE README

# Using This Template
This is a stage0 template repo, to process all of the templates in the repo you first need to establish the merge environment, and then you can use the process script, from the root of the repo.
```sh
SPECIFICATIONS_PATH=path_to_specifications \
SERVICE_NAME=service_name_from_specifications \
./.stage0_template/process 
```
 
 ## SPECIFICATIONS_PATH
 In order to process this repo you need to have the product design specifications on the local file system. Specify the path to the product repo's ``/specifications`` folder in the environment variable SPECIFICATIONS_PATH. It defaults to ``/opt/stage0/specifications``. You can clone your product specifications repository and update this environment value accordingly.

 ## Context
 This template works within a specific context in the specifications. Specifically it's is a template to create a API - so it needs to know the service name that it is creating and the details about that service. Set the environment variable SERVICE_NAME to the desired service name from the products ``architecture.yaml``  document, under the ``domains`` list. 

## Logging Level
If for some reason you need to adjust logging levels, you can do so with the LOG_LEVEL environment variable. It defaults to INFO, additional logging is available with DEBUG.

## Housekeeping
NOTE: The last step in template processing is to remove the ``.stage0O_template`` folder, so you can only process the template once. If you need to re-run the template for some reason, you can use git to rollback the changes. 

# Contributing
First off, thank you very much for being willing to contribute to this project. 

## Testing
There is a [test](./test)bash script that is key to the workflow when editing these templates. These are the configuration values for that script:
```
TEMP_REPO="${~TEMP_REPO:-/tmp/testRepo}"
LOG_LEVEL="${LOG_LEVEL:-DEBUG}"
SERVICE_NAME="${SERVICE_NAME:-partner}"
```

## How does testing work
The test script creates a temporary folder and then copies the template into that folder. It then executes the merge using the specifications found in the test_data folder, and finally does a diff between the processed folder and the test_expected folder. 

## Workflow
