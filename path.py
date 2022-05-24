import os

filePath = r'F:\MA_Program\subjective_eval'
folders = os.listdir(filePath + '/tracks')
print(folders[1:])
paths = os.listdir(filePath + '/tracks/' + folders[-1])
# paths.sort()
for i in range(len(paths)):
    paths[i] = paths[i][:-4]
print(paths)
