import json
from collections import defaultdict

all = defaultdict(defaultdict)
state = []
killed = []
injured = []

with open("E:/Projects/hw3/data/cases (2).geojson", "r") as f:
    for temp in json.load(f).get("features"):
        state.append(temp.get("properties").get('state'))
        if temp.get("properties").get('killed'):
            killed.append(temp.get("properties").get('killed'))
        else:
            killed.append(0)
        if temp.get("properties").get('injured'):
            injured.append(temp.get("properties").get('injured'))
        else:
            injured.append(0)

for i in range(len(state)):
    if state[i] in all.keys():
        all[str(state[i])]["num"] += 1
        all[str(state[i])]["killed"] += int(killed[i])
        all[str(state[i])]["injured"] += int(injured[i])
    else:
        all[str(state[i])]["num"] = 1
        all[str(state[i])]["killed"] = int(killed[i])
        all[str(state[i])]["injured"] = int(injured[i])



# print(all)

with open('E:/Projects/hw3/data/state_sum.json', "w") as json_file:
        json.dump(all, json_file)

f.close()
json_file.close()