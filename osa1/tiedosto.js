const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'Filosofian tohtori',
    greet: function () {
        console.log('hello, my name is', this.name)
    },
}

arto.greet()  // tulostuu hello, my name is Arto Hellas