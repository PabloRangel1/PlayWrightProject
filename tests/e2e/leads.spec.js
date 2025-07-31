
const {test, expect} = require('../support')
const { faker } = require('@faker-js/faker')

test('deve cadasrar para um lead na fila de espera ', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  //visit
  await page.landing.visit()
  //openLeadModel
  await page.landing.openLeadModel()
  //submitLeadForm
  await page.landing.submitleadForm(leadName, leadEmail)
  // toastHaveText
  const messageExpect = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(messageExpect)
});

test('Não deve quando email já existe ', async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead =  await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email:leadEmail
    }
  })
  
  expect(newLead.ok()).toBeTruthy() // retorna um statusCode de sucesso

  await page.landing.visit()
  await page.landing.openLeadModel()
  await page.landing.submitleadForm(leadName, leadEmail) 

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await page.toast.containText(message)
});

test('Não deve cadastrar email incorreto ', async ({ page }) => {

  await page.landing.visit()
  await page.landing.openLeadModel()
  await page.landing.submitleadForm('Pablo Rangel', 'Pablorangel.com')

  await page.landing.alertHaveText('Email incorreto')
});

test('Não deve cadastrar sem o campo nome', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModel()
  await page.landing.submitleadForm('', 'Pablorangel@hotmail.com')

  await page.landing.alertHaveText('Campo obrigatório')
  
});

test('Não deve cadastrar sem o campo email', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModel()
  await page.landing.submitleadForm('Pablo Rangel', '')

  await page.landing.alertHaveText('Campo obrigatório')

});

test('Não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModel()
  await page.landing.submitleadForm('', '')

  await page.landing.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});
