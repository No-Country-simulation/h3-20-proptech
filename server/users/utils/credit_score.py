import requests

def get_user_score(identification: int) -> int:
    """Returns the creaditicial score of an user

    Args:
        identification (int): 11 digits int representing the CUIT/CUIL/CDI

    Raises:
        TypeError: When identification is not an int
        ValueError: When identification is not an 11 digits int

    Returns:
        int: 0-5 score, 0 means not info
    """
    if type(identification) != int:
        raise TypeError
    
    if len(str(identification)) != 11:
        raise ValueError
    
    response = requests.get(f'https://api.bcra.gob.ar/CentralDeDeudores/v1.0/Deudas/{identification}', verify=False)
    
    if response.status_code != 200:
        return 0
    
    data = response.json()
    
    total_score = 0
    amount_entities = 0
    for entity in data['results']['periodos']['entidades']:
        amount_entities += 1
        total_score += entity['situacion']
        
    if amount_entities == 0:
        return 0
        
    return total_score // amount_entities