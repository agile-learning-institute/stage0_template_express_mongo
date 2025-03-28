# TS-EXPRESS-API TEMPLATE

# Using This Template
This is a stage0 template repo, to process all of the templates in the repo you first need to establish the merge environment, and then you can use the process script, from the root of the repo.
```sh
SPECIFICATIONS_PATH=path_to_specifications \
SERVICE_NAME=service_name_from_specifications \
./.stage0_template/process 
```

## SPECIFICATIONS_PATH
In order to process this repo you need to have the product design specifications on the local file system. Specify the path to the product repo's ``/specifications`` folder in the environment variable SPECIFICATIONS_PATH. It defaults to ``/opt/stage0/specifications``. You can clone your product specifications repository and update this environment value accordingly.

## SERVICE_NAME
This template works within a specific context in the specifications. Specifically it's is a template to create a service API - so it needs to know the service name that it is creating and the details about that service. Set the environment variable SERVICE_NAME to the desired service name from the products ``architecture.yaml`` document, under the ``domains`` list. 

## LOG_LEVEL
If for some reason you need to adjust logging levels, you can do so with the LOG_LEVEL environment variable. It defaults to INFO, additional logging is available with DEBUG, setting it to WARNING is minimal.

## Housekeeping
NOTE: The last step in template processing is to remove the ``.stage0O_template`` folder, so you can only process the template once. If you need to re-run the template for some reason, you can use git to rollback the changes. 

# Contributing
First off, thank you very much for being willing to contribute to this project. 

### Testing
There is a [test](./test) bash script that is key to the workflow when editing these templates. These are the configuration values for that script, the defaults are typically good enough:
```
TEMP_REPO="${TEMP_REPO:-~/tmp/testRepo}"
LOG_LEVEL="${LOG_LEVEL:-INFO}"
SERVICE_NAME="${SERVICE_NAME:-partner}"
```

### How does testing work
The test script removes and creates a temporary folder at $TEMP_REPO and then copies the template into that folder. It then executes the merge using the specifications found in the ``test_data`` folder, and finally does a diff between the processed folder and the ``test_expected`` folder. 

### Workflow

#### Start from a good place
The workflow I've found the best success with is to run the test and make sure it passes so I know I'm starting from a good place. Then I'll open the temporary repo and make my changes there and test them to make sure the updated code runs as expected. 

#### Update test_expected
Once I'm satisfied with my changes in that repo, I copy it to the ``.stage0_template/test_expected`` folder in the repo and start my template debugging cycle. 

#### Debugging process.yaml
If you made changes to the process.yaml file, or you are getting merge errors, you can set the logging level up to DEBUG to get extra information about where errors are occurring in your process.yaml file. If your merge process doesn't end with ``Completed - Processed NN templates, wrote NN files`` then there is not really any point in working on file diff's. Get the merge process errors worked out first. 

#### Template Update Workflow
We run the test, expecting it to fail and display a list of how many files don't match. Work through them one at a time. 
- Run ``./stage0_template/test``, get the list of files that don't match
- Do a ``diff`` on two specific files 
- Find and update the corresponding template
- Run the test, rinse, repeat until the template is fixed
- Time to commit and push changes
- Eventually you will get down to the point where the only remaining diff is .git
- Time to commit, push and open a PR
