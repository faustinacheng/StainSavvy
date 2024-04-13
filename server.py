from flask import Flask
from flask import render_template
from flask import Response, request, jsonify, json
app = Flask(__name__)

with open('static/data.json') as json_file:
    data = json.load(json_file)


# ROUTES
@app.route('/')
def welcome():
   return render_template('home.html', data=data)   

@app.route('/learn/<id>')
def learn_item(id):
    print(f"viewing  {format(id)}")
    item = data.get(id)
    return render_template('learn.html', item=item)   


# AJAX FUNCTIONS
# @app.route('/search', methods=['POST'])
# def search():
#     global results
#     newResults = []

#     json_data = request.get_json()   
#     search_term = json_data["term"]
#     print(f"searched for {search_term}")

#     for store_id, store_data in data.items():
#         if search_term in store_data.get('name', ''):
#             newResults.append(store_data)

#     results = newResults
#     return jsonify({'results': results})
    
if __name__ == '__main__':
    app.run(debug=True)