import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities



def getDawaresults(item):
    driver = setupOption()
    driver.get(f'https://www.al-dawaa.com/english/?q={item}')
    title = ""
    price = ""
    image = ""
    before_special=""
    promotion_title=""
    items = [["dawaa"]]
    myElem = WebDriverWait(driver,10).until(EC.presence_of_element_located((By.CLASS_NAME, 'ais-InfiniteHits-list')))
    if  myElem is not None:
        html = driver.page_source
        soup = BeautifulSoup(html)
        results = soup.find_all("div", {"class": "result-content"})
        for result in results:
            title =  result.find('h3', {"class": "result-title"}).get_text()

            promotion_title_elem = result.find("div",{"class":"result-sub-content"}).find("div",{"class" :"product-promotion"})
            if promotion_title_elem!= None :
                 promotion_title = promotion_title_elem.get_text()
            else:
                 promotion_title = ""     
                
            before_special_elem = result.find("span",{"class" :"before_special"})
            if before_special_elem != None:
                 before_special = before_special_elem.get_text()
            else:
                 before_special = ""
                 
            price_el =  result.find('span', {"class": "after_special"})
            if  price_el is not None:
                price =  price_el.get_text()
            image = result.find('div', {"class": "result-thumbnail"}).find("img")['src']
            link = result.find('a', {"class": "result"})['href']
            items[0].append({"web" : "dawa" ,"title" : title ,"price" : price,"image":image,"link":link,"promotion_title":promotion_title,"before_special":before_special})   
    driver.close()
    return items


def getNahdiresults(item):
    driver2 = setupOption()
    driver2.get(f'https://www.nahdionline.com/en/?q={item}')
    title = ""
    price = ""
    image = ""
    before_special=""
    promotion_title=""
    items = [["nahdi"]]
    myElem = WebDriverWait(driver2,10).until(EC.presence_of_element_located((By.CLASS_NAME, 'ais-Hits-list')))
    if  myElem is not None:
        html2 = driver2.page_source
        soup2 = BeautifulSoup(html2)
        results = soup2.find_all("div", {"class": "result-wrapper"})
        for result in results:
            title =  result.find('h3', {"class": "result-title"}).find("a").get_text()
            promotion_title_elem = result.find("div",{"class" :"nahdi-promo"})
            if promotion_title_elem != None:
                promotion_title = promotion_title_elem.get_text()
            else:
                 promotion_title = ""
            before_special_elem = result.find("span",{"class" :"before_special"})
            if before_special_elem != None:
                before_special = before_special_elem.get_text()
            else:
                 before_special = ""
            price_el =  result.find('span', {"class": "after_special"})
            if  price_el is not None:
                price =  price_el.get_text()
            image = result.find('div', {"class": "result-thumbnail"}).find("a").find("img")['src']
            link = result.find('div', {"class": "result-thumbnail"}).find("a")['href']
            items[0].append({"web" : "nahdi" ,"title" : title ,"price" : price,"image":image,"link":link,"promotion_title":promotion_title,"before_special":before_special})   
    else:
        print  ("Page isnot ready!")     
    driver2.close()   
    return items 

def getMuthdaresults(item):
    driver3 = setupOption()
    driver3.get(f'https://unitedpharmacy.sa/en/catalogsearch/result/?q={item}')
    title = ""
    price = ""
    image = ""
    items = [["muthda"]]
    link = ""
    before_special=""
    promotion_title=""
    myElem = WebDriverWait(driver3,10).until(EC.presence_of_element_located((By.CLASS_NAME, 'ais-Hits-list')))
    if  myElem is not None:
        html3 = driver3.page_source
        soup3 = BeautifulSoup(html3)
        results = soup3.find_all("div", {"class": "result-content"})
        for result in results:
            title =  result.find('a', {"class": "product-item-link"}).get_text()
            promotion_title_elem = result.find("div",{"class" :"offer-section"})
            if promotion_title_elem != None:
                promotion_title = promotion_title_elem.get_text()   
            else:
                 promotion_title = ""
            before_special_elem = result.find("span",{"class" :"before_special"})
            if before_special_elem != None:
                before_special = before_special_elem.get_text()
            else:
                 before_special = ""
            price_el =  result.find('span', {"class": "after_special"})
            if  price_el != None:
                    price =  price_el.get_text() 
            image = result.find('div',{"class":'result-thumbnail'}).find('img')['src']
            link =  result.find('a', {"class": "result"})['href']
            items[0].append({"title" : title ,"price" : price,"image":image,"link":link,"promotion_title":promotion_title,"before_special":before_special})  
    else:
        print("page not ready") 
    driver3.close()
    return items

def setupOption():
        options = Options()
        options.add_argument('--headless')
        options.add_argument("--no-sandbox")
        options.add_argument("--disable-infobars")
        options.add_argument("--disable-extensions")
        options.add_argument("--disable-popup-blocking")
        options.add_argument('--ignore-ssl-errors')
        options.add_argument('--incognito')
        options.add_experimental_option("detach", True)
        options.add_argument('--ignore-certificate-errors')
        options.add_argument('--blink-settings=imagesEnabled=false')
        options.add_experimental_option("useAutomationExtension", False)
        options.add_experimental_option("excludeSwitches", ['enable-automation'])
        options.set_capability('goog:loggingPrefs', {'performance': 'ALL'})        
        driver = webdriver.Chrome( options=options)
        return driver
