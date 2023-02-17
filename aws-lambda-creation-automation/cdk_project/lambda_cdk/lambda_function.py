from datetime import date

def lambda_handler(event, context):

    today = date.today()
    today = str(today)
    print("Today`s date:", today)
    return {
        'statusCode': 200
    }