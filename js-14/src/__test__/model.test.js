import Model from '../js/model.js'
describe('Model class', () => {
    it('Should create Model instance', () => {
        const model = new Model();

        expect(model instanceof Model).toBe(true);
    });
    it('Should add item to cart', () => {
        const cart = new Model();
        expect.assertions(1);
        return cart.addItem("https://www.google.com/")
            .then(data => {
                expect(cart.items[0]).toHaveProperty('url', "https://www.google.com/")
            })
            .catch(error => expect(error).not.toBeNull())
    });
    it('Should remove item from cart by id', () => {
        const cart = new Model();
        expect.assertions(1);
        return cart.addItem("https://www.google.com/")
            .then(data => {
                cart.removeItem(data.id);
                expect(cart.items).toHaveLength(0)
            })
            .catch(error => expect(error).not.toBeNull())
    });
})