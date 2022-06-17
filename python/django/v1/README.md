# Ampli Python Wrapper
An example app using the Ampli Python Wrapper in Django project

# Usage

### Setup the project
You will need to do the following before running the app.

`pip install amplitude-analytics django segment-analytics-python`

### Run the app
You can run the app using the events from our sample tracking plan.
This will start a test server http://127.0.0.1:8000/.
* `python manage.py runserver`

In your browser

1. Open http://127.0.0.1:8000/amplitude/identify?user_id=example_user&required_number=15.1&optional_array=a,b,c to send identify event.
2. Open http://127.0.0.1:8000/amplitude/groupidentify?group_type=team&group_name=SDE&required_boolean=false to send a group identify event.
3. Open http://127.0.0.1:8000/amplitude/setgroup?user_id=example_user&group_type=team&group_name=SDE to put example_user into SDE team.
4. Open http://127.0.0.1:8000/amplitude/eventnoproperties?user_id=example_user to track an EventNoProperties event.
5. Open http://127.0.0.1:8000/amplitude/eventwithconsttypes?user_id=example_user to track a EventWithConstTypes event.
6. Open http://127.0.0.1:8000/amplitude/eventwithallproperties to track a EventWithAllProperties event.
7. Open http://127.0.0.1:8000/amplitude/flush to flush events in buffer

### Pull your Ampli Wrapper
If you want to use your own tracking plan and Ampli Wrapper
1. `npm i -g @amplitude/ampli`
2. In ampli_app folder run `ampli pull`
3. Update `ampli_app/views.py` and `ampli_app/urls.py` to use the events from your tracking plan

# Project structure
* README.md - you are here *
* v1/ 
  * [urls.py](v1/urls.py) - Url mapping for v1 project
  * [settings.py](v1/settings.py) - Project setting
* ampli_app
  * ampli
    * [ampli.py](ampli_app/ampli/ampli.py) - Generated SDK, don't modify by hand. Update with `ampli pull`
    * [requirements.txt](ampli_app/ampli/requirements.txt) - Dependencies of ampli wrapper
  * [views.py](ampli_app/views.py) - Views of ampli app contains examples using Ampli SDK. A good place to start.
  * [urls.py](ampli_app/urls.py) - Url mappings for views of app
  * [util.py](ampli_app/util.py) - function to read api_key from .env file
  * [plugins.py](plugins.py) - Example plugin for Event enrichment