
lista = [0]

for x in range(1,25):
    anterior= lista[x-1]
    actual = anterior + x
    lista.append(actual)

print(len(lista))
print(lista)

dic = { 'nombre': 'Erick', 'apellido': 'Torres', 'edad': '25 anos', 'direccion': { 'Provincia': 'Cartago', 'Canton': 'Paraiso', 'Distrito': 'Orosi' } , 'Profesion': 'Programador'}
print (dic)


x = {}
print(type(x))

xx = (2,3,5,6,7,8)
print(xx[4])