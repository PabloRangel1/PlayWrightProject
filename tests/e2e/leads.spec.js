
const {test, expect} = require('../support')
const { faker } = require('@faker-js/faker')

test('deve cadasrar para um lead na fila de espera ', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();
  //visit
  await page.leads.visit()
  //openLeadModel
  await page.leads.openLeadModel()
  //submitLeadForm
  await page.leads.submitleadForm(leadName, leadEmail)
  // toastHaveText
  const messageExpect = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
  await page.popup.haveText(messageExpect)
});

test('Não deve quando cadastrar quando email já existe ', async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead =  await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email:leadEmail
    }
  })
  
  expect(newLead.ok()).toBeTruthy() // retorna um statusCode de sucesso

  await page.leads.visit()
  await page.leads.openLeadModel()
  await page.leads.submitleadForm(leadName, leadEmail) 

  const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
  await page.popup.haveText(message)
});

test('Não deve cadastrar email incorreto ', async ({ page }) => {

  await page.leads.visit()
  await page.leads.openLeadModel()
  await page.leads.submitleadForm('Pablo Rangel', 'Pablorangel.com')

  await page.leads.alertHaveText('Email incorreto')
});

test('Não deve cadastrar sem o campo nome', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModel()
  await page.leads.submitleadForm('', 'Pablorangel@hotmail.com')

  await page.leads.alertHaveText('Campo obrigatório')
  
});

test('Não deve cadastrar sem o campo email', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModel()
  await page.leads.submitleadForm('Pablo Rangel', '')

  await page.leads.alertHaveText('Campo obrigatório')

});

test('Não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await page.leads.visit()
  await page.leads.openLeadModel()
  await page.leads.submitleadForm('', '')

  await page.leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])
});
