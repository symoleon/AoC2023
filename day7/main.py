from functools import cmp_to_key
f = open("input.txt")

labels = ["A","K","Q","T","9","8","7","6","5","4","3","2","J"]

items = []
for x in f:
  cards = x.split()[0]
  bid = int(x.split()[1])
  items.append([cards,bid])


def isFiveOfKind(string,jkrCnt):
  if jkrCnt >= 4: return True
  firstCnt = string.count(string[0])
  if firstCnt +jkrCnt == 5:
    return True

def isFourOfKind(string,jkrCnt):
  if jkrCnt == 3: return True
  firstCnt = string.count(string[0])
  secondCnt = string.count(string[-1])

  if firstCnt + jkrCnt == 4 or secondCnt + jkrCnt == 4:
    return True
  return False

def isFullHouse(string,jkrCnt):
  firstCnt = string.count(string[0])
  secondCnt = string.count(string[-1])
  if firstCnt + jkrCnt == 3 and secondCnt== 2:
    return True
  return False
def isThreeOfAKind(string,jkrCnt):
  if jkrCnt == 2: return True
  firstCnt = string.count(string[0])
  if firstCnt +jkrCnt == 3: return True
  
  return False

def isTwoPair(string,jkrCnt):
  if string.count(string[0]) == 2 and string.count(string[2]) == 2:
    return True
  return False
def isOnePair(string,jkrCnt):
  if jkrCnt == 1: return True
  if string.count(string[0]) == 2:
    return True

def findType(string):
  jkrCnt = string.count("J")
  string = string.replace("J","")
  if isFiveOfKind(string,jkrCnt):
    return 10
  elif isFourOfKind(string,jkrCnt):
    return 9
  elif isFullHouse(string,jkrCnt):
    return 8
  elif isThreeOfAKind(string,jkrCnt):
    return 7
  elif isTwoPair(string,jkrCnt):
    return 6
  elif isOnePair(string,jkrCnt):
    return 5
  return 0


def reorder_string(s):
    jokers = s.count("J")
    s = s.replace("J","")

    char_counts = {}
    for char in s:
        char_counts[char] = char_counts.get(char, 0) + 1
    sorted_chars = sorted(char_counts, key=lambda x: char_counts[x], reverse=True)
    reordered_str = ''.join([char * char_counts[char] for char in sorted_chars])
        
    return reordered_str + "J"*jokers


def cust_sort(a,b):
  aType = findType(reorder_string(a[0]))
  bType = findType(reorder_string(b[0]))
  if(aType > bType):
    return 1
  elif (bType > aType): return -1

  for i in range(0,5):
    aIdx = labels.index(a[0][i])
    bIdx = labels.index(b[0][i])
    if(aIdx < bIdx):
      return 1
    elif (aIdx > bIdx): return -1

  return 0

cmp_items = cmp_to_key(cust_sort)
items.sort(key = cmp_items)

sum = 0
for idx,x in enumerate(items):
  print(x[0])
  sum += (idx+1)*x[1]

# My time and rank:
# 02:43:48  10723
print("Part2:", sum)