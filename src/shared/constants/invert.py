from collections import OrderedDict
import json 

if __name__ == "__main__":
  file = json.load(open("nli_train.json"))

  indexes = file["index"]
  dataset = file["dataset"]
  newDict = OrderedDict()

  # for k in indexes: 
  #   print(k, indexes[k])
  #   newDict[indexes[k]] = k
  # print(newDict)
  # file["index"] = newDict 
  snli_indexes = {}
  mnli_indexes = {}

  for k in indexes: 
    if dataset[k] == "snli":
      snli_indexes[int(indexes[k])] = int(k) 
    else:
      mnli_indexes[int(indexes[k])] = int(k)

  file["snli_indexes"] = snli_indexes
  file["mnli_indexes"] = mnli_indexes

  with open("nli_train_test.json", "w") as f: 
    out = json.dumps(file, indent=4)
    f.write(out)