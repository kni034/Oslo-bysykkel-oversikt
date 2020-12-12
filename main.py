import requests
import time
import sys

#printing relevnt data for each station
def display_stations(data):
    for station in data.values():
        print(f"ID: {station['station_id']} Name: {station['name']} Capacity: {station['capacity']} Bikes available: {station['num_bikes_available']} Docks available: {station['num_docks_available']}")

#parsing api response
def parse_data(data):
    data_info = data.json()
    stations_info = data_info['data']['stations']
    return stations_info

def main():
    while True:
        try:
            station_info_json = requests.get('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json')
            avalibility_json = requests.get('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.jsonf')

            #checking for error in the response
            if station_info_json.status_code > 204 or avalibility_json.status_code > 204:
                raise ValueError()
        except ValueError:
            print("api is unavailable")
            sys.exit()
        
        
        stations_available = parse_data(avalibility_json)
        stations_info = parse_data(station_info_json)

        #merging the api responses for ease of use
        combined_dict = {}
        for i,station in enumerate(stations_available):
            combined_dict[station['station_id']] = {**stations_info[i], **stations_available[i]}

        display_stations(combined_dict)
        time.sleep(10)

if __name__ == "__main__":
    main()
