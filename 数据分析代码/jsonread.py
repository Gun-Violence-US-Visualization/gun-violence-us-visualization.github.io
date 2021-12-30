#现在这是一个可以正常读写json的程序。大家不要改动它！
import json
from os import kill
import pandas as pd
# f = open('E:/Projects/hw3/data/data_in_use/legal_guns.json',)
# state = json.load(f)

date = []
race_sex = []
age = []
kill_injure = []
kill_injure3000 = []
state = []
gunhold = []
rate = []
policy = []

with open("E:/Projects/hw3/data/cases (2).geojson", "r") as f:
    for temp in json.load(f).get("features"):
        date.append(
            str(temp.get("properties").get('year')) + "-" +
            str(temp.get("properties").get('month')) + "-" +
            str(temp.get("properties").get('day')))  #整理时间数据
        if temp.get("properties").get('killed'):
                if temp.get("properties").get('injured'):
                        sum = int(temp.get("properties").get('killed')) + int(temp.get("properties").get('injured'))
                else:
                        sum = int(temp.get("properties").get('killed')) + 0
        elif temp.get("properties").get('injured'):
                sum = int(temp.get("properties").get('injured')) + 0
        else:
                sum = 0
        kill_injure3000.append(sum)


with open(
        "E:/Projects/hw3/data/Stanford Mass Shootings in America (MSA)/mass_shooting_events_stanford_msa_release.geojson",
        'r') as f:
    for temp in json.load(f).get("features"):
        date.append(temp.get("properties").get('Date'))  #整理时间数据
        if temp.get("properties").get("Average Shooter Age"):
                age.append(temp.get("properties").get("Average Shooter Age"))
        elif temp.get("properties").get("Shooter Age(s)"):
                age.append(temp.get("properties").get("Shooter Age(s)"))
        else:
                age.append("0")

        if temp.get("properties").get("Number of Civilian Fatalities"):
            kill = int(temp.get("properties").get("Number of Civilian Fatalities"))
        else:
            kill = 0
        if temp.get("properties").get("Number of Civilian Injured"):
            injure = int(temp.get("properties").get("Number of Civilian Injured"))
        else:
            injure = 0
        kill_injure.append(kill + injure)

        #罪犯画像
        if "White" in temp.get("properties").get("Shooter Race"):
            string = "White" + "_" + temp.get("properties").get("Shooter Sex")
        if "Asian" in temp.get("properties").get("Shooter Race"):
            string = "Asian" + "_" + temp.get("properties").get("Shooter Sex")
        if "Black" in temp.get("properties").get("Shooter Race"):
            string = "Black" + "_" + temp.get("properties").get("Shooter Sex")
        if "Unkown" in temp.get("properties").get("Shooter Race"):
            string = "Unkown" + "_" + temp.get("properties").get("Shooter Sex")
        if "Some" in temp.get("properties").get("Shooter Race"):
            string = "Unkown" + "_" + temp.get("properties").get("Shooter Sex")

        if string:
                race_sex.append(string)
        else:
                race_sex.append("0")

for i in range(len(race_sex)):
    if race_sex[i] == "Unkown_Unkown":
        race_sex[i] = "Unkown"

# 输出到csv
dataframe = pd.DataFrame({'date': date, 'kill_injure3000': kill_injure3000})
dataframe.to_csv("E:/Projects/hw3/data/date2.csv", index=False,
                 sep=',')  #可以先print到csv里再用excel做

dataframe1 = pd.DataFrame({
    'age': age,
    'kill_injure': kill_injure,
    'race_sex': race_sex
})
dataframe1.to_csv("E:/Projects/hw3/data/profile.csv", index=False, sep=',')

f.close()

# 正的是蓝的，负的是红的
# policy["Alabama"]["gunhold"]这样

with open("E:/Projects/hw3/data/policy.json", 'r') as f:
        data = json.load(f)
        for item in data:
                state.append(item)
                #print(data[item])
                policy.append(data[item]["total"])
                gunhold.append(data[item]["gunhold"])
                rate.append(data[item]["rate"])

        for temp in json.load(f):
            state.append(temp)
        for temp in json.load(f).get(""):    
            gunhold.append(temp.get["gunhold"])
            rate.append(temp.get["rate"])
            policy.append(temp.get["total"])
print(state)
print(gunhold)
print(rate)
print(policy)

dataframe2 = pd.DataFrame({
    'state': state,
    'policy': policy,
    'gunhold': gunhold,
    'rate': rate
})
dataframe2.to_csv("E:/Projects/hw3/data/state.csv", index=False, sep=',')
f.close()

# with open('E:/Projects/hw3/data/data_in_use/legal_guns.json', "w") as json_file:
#         json.dump(state, json_file)
