
#include <iostream>
#include <string>

using namespace std;
// Enum for customer categories
enum Category { Domestic, Commercial, MediumIndustrial };

// Struct for tariff details
struct Tariff {
    double First_kWh_rate;
    double nextYkWhRate;
    double aboveZkWhRate;
    double peakRate;
    double shoulderRate;
    double offPeakRate;
    double averageRate;
};

// Function to calculate Domestic consumer bill
double calculateDomesticBill(int consumption) {
    const Tariff domesticTariff = {250.0, 797.3, 412.0};
		    if (consumption <= 15) 
			return consumption * domesticTariff.First_kWh_rate;
		    else if (consumption <= 80) 
			return 15 * domesticTariff.First_kWh_rate + (consumption - 15) * domesticTariff.nextYkWhRate;
		    else if (consumption <= 150) 
			return 15 * domesticTariff.First_kWh_rate + 65 * domesticTariff.nextYkWhRate + (consumption - 80) * domesticTariff.aboveZkWhRate;
		    else return 15 * domesticTariff.First_kWh_rate + 65 * domesticTariff.nextYkWhRate + 70 * domesticTariff.aboveZkWhRate + (consumption - 150) * domesticTariff.aboveZkWhRate;
		}

// Function to calculate Commercial consumer bill
double calculateCommercialBill(int consumption, string time_of_use) {
    const Tariff commercialTariff = {791.9, 606.6, 387.4, 600.6};
    if (time_of_use == "Peak") 
	return consumption * commercialTariff.peakRate;
    else if (time_of_use == "Shoulder") 
	return consumption * commercialTariff.shoulderRate;
    else if (time_of_use == "Off-peak") 
	return consumption * commercialTariff.offPeakRate;
    else 
	return consumption * commercialTariff.averageRate;
}

// Function to calculate Medium Industrial consumer bill
double calculateMediumIndustrialBill(int consumption, string time_of_use) {
    const Tariff mediumIndustrialTariff = {608.7, 453.8, 264.6, 448.7};
    if (time_of_use == "Peak") 
	return consumption * mediumIndustrialTariff.peakRate;
    else if (time_of_use == "Shoulder") 
	return consumption * mediumIndustrialTariff.shoulderRate;
    else if (time_of_use == "Off-peak") 
	return consumption * mediumIndustrialTariff.offPeakRate;
    else 
	return consumption * mediumIndustrialTariff.averageRate;
}

// Function to display customer details
void displayCustomerDetails(int customerCode, string customer_name, Category customer_category) {
    cout << "Customer Code: " << customerCode << std::endl;
    cout << "Customer Name: " << customer_name << std::endl;
    cout << "Customer Category: ";
    switch (customer_category) {
        case Domestic:
            cout << "Domestic" << std::endl;
            break;
        case Commercial:
            cout << "Commercial" << std::endl;
            break;
        case MediumIndustrial:
            cout << "Medium Industrial" << std::endl;
            break;
    }
}

// Function to display bill details
void displayBillDetails(double bill_amount, int consumption, string time_of_use = "") {
    cout << "Consumption (kWh): " << consumption << std::endl;
    if (!time_of_use.empty()) cout << "Time of Use: " << time_of_use << std::endl;
    cout << "Bill Amount (UGX): " << bill_amount << std::endl;
}

int main() {
    int customerCode;
    string customer_name;
    Category customer_category;
    int consumption;
    string time_of_use;

    // Input customer details
    cout << "Enter customer code: ";
    cin >> customerCode;
    cout << "Enter customer name: ";
    cin.ignore();
    std::getline(cin, customer_name);

    cout << "Enter customer category (1 - Domestic, 2 - Commercial, 3 - Medium Industrial): ";
    int categoryChoice;
	int Consumption;
    string Time_of_use;
    cin >> categoryChoice;
    
    switch (categoryChoice) {
    	case 1:
    	cin >> Consumption ;
    	
    	calculateDomesticBill(Consumption);	
    		break;
    	case 2:
    		cin >>Consumption;
    		cin >> Time_of_use;
    		
    		calculateCommercialBill(Consumption,Time_of_use);
    		break;
    	case 3:
    		cin >>Consumption ;
    		cin >> Time_of_use;
    		calculateMediumIndustrialBill(Consumption,Time_of_use);
    		break;
    	default:
   cout << "Please enter the from given range above" ;
    
    }}		   		
