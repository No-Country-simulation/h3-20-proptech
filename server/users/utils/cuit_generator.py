def get_cuit(dni: int, gender: str) -> int:
    if gender not in ['M','F']:
        raise ValueError
    prefix = '20' if gender == 'M' else '27' 
    weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]
    
    dni_with_prefix = prefix + str(dni)
    if len(dni_with_prefix) != 10:
        raise ValueError
    dni_as_list = list(map(int, dni_with_prefix))
    
    total = sum(n * p for n, p in zip(dni_as_list, weights))
    
    resto = total % 11
    
    if resto == 0:
        verification_code = '0'
    elif resto == 1:
        verification_code =  '9' if prefix == '20' or prefix == '27' else '4'
    else:
        verification_code =  str(11 - resto)
    
    return int(verification_code + dni_with_prefix)